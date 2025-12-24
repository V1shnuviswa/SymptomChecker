# AI Symptom Checker Agent

An intelligent symptom checker application powered by LangChain's Zero-Shot React Agent with Chain of Thought reasoning, using Moonshot Kimi K2 API.

## Features

- 🤖 **Advanced AI Agent**: Uses LangChain Zero-Shot React Agent with Chain of Thought reasoning
- 🔍 **Accurate Diagnosis**: Analyzes symptoms and provides evidence-based medical information
- 💊 **Comprehensive Recommendations**: Includes medications, diet, precautions, and severity assessment
- 🎨 **Modern UI**: Form-based interface (not chatbot style) with beautiful card-based results
- 🔗 **Web Research**: Integrates Tavily search for up-to-date medical information
- ⚡ **Fast API**: Built with FastAPI for high performance

## Architecture

### Backend Components

1. **Agent (`agent.py`)**: LangChain Zero-Shot React Agent with CoT reasoning
2. **Tools (`tools.py`)**: Custom medical search and analysis tools
3. **API (`main.py`)**: FastAPI server with REST endpoints
4. **Config (`config.py`)**: Centralized configuration management

### Frontend

- **Form-based UI**: Clean, intuitive symptom input form
- **Results Display**: Structured card-based result presentation
- **Responsive Design**: Works on desktop and mobile devices

## Installation

### 1. Install Dependencies

```powershell
pip install -r requirements.txt
```

### 2. Configure Environment

The `.env` file is already configured with your API keys:

```env
MOONSHOT_API_KEY=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
MOONSHOT_MODEL=moonshotai/kimi-k2-instruct
MOONSHOT_BASE_URL=https://api.groq.com/openai/v1
TAVILY_API_KEY=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
```

### 3. Run the Application

```powershell
python main.py
```

The application will start on `http://localhost:8000`

## Usage

1. **Open Browser**: Navigate to `http://localhost:8000`
2. **Enter Symptoms**: Describe your symptoms in detail in the text area
3. **Analyze**: Click "Analyze Symptoms" button
4. **View Results**: See comprehensive diagnosis with:
   - Identified symptoms
   - Detailed diagnosis with severity level
   - Recommended medications
   - Diet recommendations
   - Precautions and self-care measures
   - Doctor visit necessity
   - Additional recommendations

## API Endpoints

### POST /api/analyze

Analyze symptoms and return diagnosis.

**Request:**
```json
{
  "symptoms": "I have a headache and vomiting"
}
```

**Response:**
```json
{
  "symptoms": "Headache, vomiting",
  "diagnosis": "Detailed diagnosis...",
  "medications": ["Medication 1", "Medication 2"],
  "diet": ["Diet recommendation 1", "Diet recommendation 2"],
  "precautions": "Precautions and care measures...",
  "doctor_visit": "yes",
  "severity": "moderate",
  "recommendations": "Detailed recommendations..."
}
```

### GET /api/health

Health check endpoint.

**Response:**
```json
{
  "status": "healthy",
  "model": "moonshotai/kimi-k2-instruct",
  "api_configured": true
}
```

## How It Works

1. **User Input**: User describes symptoms in natural language
2. **Agent Processing**: 
   - Agent receives symptoms and uses Chain of Thought reasoning
   - Uses medical search tool to gather accurate information
   - Analyzes symptoms to identify possible conditions
   - Gets treatment recommendations from reliable sources
3. **Structured Output**: Agent formats response as structured JSON
4. **UI Display**: Frontend displays results in an organized, easy-to-read format

## Agent Tools

### 1. Medical Search Tool
- Searches for accurate medical information using Tavily
- Provides evidence-based content from reliable sources

### 2. Symptom Analysis Tool
- Analyzes symptoms for structured medical assessment
- Identifies patterns and severity

### 3. Treatment Recommendation Tool
- Searches for treatment options, medications, and remedies
- Provides diet and precaution recommendations

## Project Structure

```
SymptomCheckerAgent/
├── agent.py              # LangChain React Agent implementation
├── tools.py              # Custom agent tools
├── main.py               # FastAPI application
├── config.py             # Configuration management
├── requirements.txt      # Python dependencies
├── .env                  # Environment variables
├── static/
│   └── index.html       # Frontend UI
└── README.md            # This file
```

## Safety & Disclaimer

⚠️ **Medical Disclaimer**: This application is for informational purposes only and should not replace professional medical advice. Always consult with qualified healthcare professionals for medical diagnosis and treatment.

## Configuration Options

All configuration can be modified in the `.env` file:

- `MOONSHOT_API_KEY`: Your Moonshot/Groq API key
- `MOONSHOT_MODEL`: Model to use (default: moonshotai/kimi-k2-instruct)
- `MOONSHOT_TEMPERATURE`: Model temperature (0.0 for deterministic)
- `TAVILY_API_KEY`: Tavily search API key
- `API_TIMEOUT`: Maximum API request timeout (seconds)
- `CONFIDENCE_THRESHOLD`: Minimum confidence for diagnosis
- `MAX_WEB_SOURCES`: Maximum number of web sources to search

## Troubleshooting

### Server won't start
- Ensure all dependencies are installed: `pip install -r requirements.txt`
- Check if port 8000 is available

### API errors
- Verify API keys in `.env` file
- Check internet connection for Tavily search
- Review logs for specific error messages

### No results displayed
- Open browser console (F12) to check for errors
- Ensure backend is running on `http://localhost:8000`
- Check API health endpoint: `http://localhost:8000/api/health`

## Development

To run in development mode with auto-reload:

```powershell
python main.py
```

The server will automatically reload when you make changes to the code.

## License

This project is for educational and demonstration purposes.

## Support

For issues and questions, please check the application logs and ensure all API keys are correctly configured.
