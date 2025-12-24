"""Configuration settings for the Symptom Checker Agent."""
import os
from typing import Optional
from dotenv import load_dotenv

# Load environment variables
load_dotenv()


class Config:
    """Application configuration."""
    
    # Moonshot API Configuration
    MOONSHOT_API_KEY: str = os.getenv("MOONSHOT_API_KEY", "")
    MOONSHOT_MODEL: str = os.getenv("MOONSHOT_MODEL", "moonshotai/kimi-k2-instruct")
    MOONSHOT_BASE_URL: str = os.getenv("MOONSHOT_BASE_URL", "https://api.groq.com/openai/v1")
    MOONSHOT_TEMPERATURE: float = float(os.getenv("MOONSHOT_TEMPERATURE", "0.0"))
    
    # Tavily API Configuration
    TAVILY_API_KEY: str = os.getenv("TAVILY_API_KEY", "")
    
    # Request timeouts
    API_TIMEOUT: int = int(os.getenv("API_TIMEOUT", "300"))
    WEB_SCRAPE_TIMEOUT: int = int(os.getenv("WEB_SCRAPE_TIMEOUT", "180"))
    
    # Agent behavior settings
    CONFIDENCE_THRESHOLD: float = float(os.getenv("CONFIDENCE_THRESHOLD", "0.75"))
    MAX_WEB_SOURCES: int = 5
    INTENT_CONFIDENCE_THRESHOLD: float = 0.7
    
    @classmethod
    def validate(cls):
        """Validate required configuration."""
        if not cls.MOONSHOT_API_KEY:
            raise ValueError("MOONSHOT_API_KEY is required")
        if not cls.TAVILY_API_KEY:
            raise ValueError("TAVILY_API_KEY is required")


# Create global config instance
config = Config()
