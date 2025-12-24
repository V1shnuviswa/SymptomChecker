"""FastAPI backend for the Symptom Checker application."""
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel
from typing import Dict, Any
from agent import agent
from config import config
import uvicorn


# Validate configuration on startup
config.validate()

# Create FastAPI app
app = FastAPI(
    title="Symptom Checker API",
    description="AI-powered symptom checker using LangChain Zero-Shot React Agent",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class SymptomRequest(BaseModel):
    """Request model for symptom analysis."""
    symptoms: str


class SourceModel(BaseModel):
    """Model for source references."""
    title: str
    url: str


class SymptomResponse(BaseModel):
    """Response model for symptom analysis."""
    symptoms: str
    opening_message: str = ""
    diagnosis: list  # Changed to list for bullet points
    possible_conditions: list = []
    medications: list
    medication_disclaimer: str = ""
    diet: list
    precautions: str
    doctor_visit: str
    doctor_specialist: str = ""
    urgency: str = "routine"
    severity: str
    recommendations: str
    when_to_seek_emergency: str = ""
    dos_donts: dict = {"dos": [], "donts": []}  # New field
    sources: list[SourceModel] = []


@app.get("/")
async def root():
    """Root endpoint."""
    return FileResponse("static/index.html")


@app.post("/api/analyze", response_model=SymptomResponse)
async def analyze_symptoms(request: SymptomRequest) -> Dict[str, Any]:
    """
    Analyze symptoms and return diagnosis with recommendations.
    
    Args:
        request: SymptomRequest containing user's symptoms
        
    Returns:
        SymptomResponse with diagnosis, medications, diet, precautions, etc.
    """
    try:
        if not request.symptoms or len(request.symptoms.strip()) == 0:
            raise HTTPException(status_code=400, detail="Symptoms cannot be empty")
        
        # Analyze symptoms using the agent
        result = agent.analyze_symptoms(request.symptoms)
        
        # Helper function to ensure symptoms is a string
        def format_symptoms(symptoms_data):
            if isinstance(symptoms_data, list):
                return ", ".join(str(s) for s in symptoms_data)
            return str(symptoms_data) if symptoms_data else request.symptoms
        
        # Helper function to ensure sources is properly formatted
        def format_sources(sources_data):
            if not sources_data:
                return []
            if isinstance(sources_data, list):
                formatted = []
                for source in sources_data:
                    if isinstance(source, dict):
                        formatted.append({
                            "title": str(source.get("title", "Medical Source")),
                            "url": str(source.get("url", ""))
                        })
                return formatted
            return []
        
        # Ensure all required fields are present and properly formatted
        response = {
            "symptoms": format_symptoms(result.get("symptoms")),
            "opening_message": result.get("opening_message", "Thank you for sharing your symptoms with me. Let me help you understand what might be going on."),
            "diagnosis": result.get("diagnosis", ["Unable to determine diagnosis"]) if isinstance(result.get("diagnosis"), list) else [str(result.get("diagnosis", "Unable to determine diagnosis"))],
            "possible_conditions": result.get("possible_conditions", []) if isinstance(result.get("possible_conditions"), list) else [],
            "medications": result.get("medications", []) if isinstance(result.get("medications"), list) else [],
            "medication_disclaimer": result.get(
                "medication_disclaimer",
                "⚠️ IMPORTANT: Do NOT take any medications without consulting a qualified healthcare professional first. These are suggestions for discussion with your doctor only."
            ),
            "diet": result.get("diet", []) if isinstance(result.get("diet"), list) else [],
            "precautions": result.get("precautions", "Please monitor your symptoms and consult a healthcare professional"),
            "doctor_visit": result.get("doctor_visit", "no"),  # Default to 'no', let AI decide
            "doctor_specialist": result.get("doctor_specialist", ""),  # Empty by default, only show if AI recommends
            "urgency": result.get("urgency", "routine"),  # Changed default from 'soon' to 'routine'
            "severity": result.get("severity", "moderate"),
            "recommendations": result.get("recommendations", "Please consult with a healthcare professional for proper evaluation"),
            "when_to_seek_emergency": result.get(
                "when_to_seek_emergency",
                "Seek immediate medical attention for severe symptoms, difficulty breathing, chest pain, or sudden changes"
            ),
            "dos_donts": result.get("dos_donts", {"dos": [], "donts": []}) if isinstance(result.get("dos_donts"), dict) else {"dos": [], "donts": []},
            "sources": format_sources(result.get("sources", []))
        }
        
        return response
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error analyzing symptoms: {str(e)}")


@app.get("/api/health")
async def health_check():
    """Health check endpoint."""
    return {
        "status": "healthy",
        "model": config.MOONSHOT_MODEL,
        "api_configured": bool(config.MOONSHOT_API_KEY)
    }


# Mount static files
try:
    app.mount("/static", StaticFiles(directory="static"), name="static")
except Exception:
    pass  # Static directory might not exist yet


if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )
