# AI Symptom Checker - React + Tailwind CSS

A modern, professional symptom checker application with React + Tailwind CSS frontend and LangChain Zero-Shot React Agent backend.

## ✨ Features

- 🎨 **Modern React UI** with Tailwind CSS
- 🤖 **AI-Powered Analysis** using LangChain Zero-Shot React Agent
- ⚠️ **Medical Disclaimers** - Clear warnings about medication consultation
- 📊 **Structured Results** - Organized, easy-to-read diagnosis
- 🔍 **Chain of Thought** reasoning for accurate analysis
- 🎯 **Urgency Levels** - Immediate, Soon, or Routine care needed
- 🚨 **Emergency Warnings** - When to seek immediate care

## 🚀 Quick Start

### Backend Setup

1. **Navigate to project root:**
   ```powershell
   cd C:\Users\vishn\Downloads\SymptomCheckerAgent
   ```

2. **Activate virtual environment (if not already active):**
   ```powershell
   .\venv\Scripts\Activate.ps1
   ```

3. **Start the backend server:**
   ```powershell
   python main.py
   ```
   
   Backend will run on: `http://localhost:8000`

### Frontend Setup

1. **Open a NEW terminal and navigate to frontend:**
   ```powershell
   cd C:\Users\vishn\Downloads\SymptomCheckerAgent\frontend
   ```

2. **Install dependencies:**
   ```powershell
   npm install
   ```

3. **Start the development server:**
   ```powershell
   npm run dev
   ```
   
   Frontend will run on: `http://localhost:3000`

4. **Open your browser:**
   Navigate to `http://localhost:3000`

## 📁 Project Structure

```
SymptomCheckerAgent/
├── frontend/                  # React + Tailwind frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── SymptomForm.jsx      # Input form
│   │   │   ├── ResultCard.jsx       # Results display
│   │   │   └── LoadingSpinner.jsx   # Loading state
│   │   ├── App.jsx            # Main app component
│   │   ├── main.jsx           # React entry point
│   │   └── index.css          # Tailwind styles
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── postcss.config.cjs
├── agent.py                   # LangChain Agent
├── tools.py                   # Custom AI tools
├── main.py                    # FastAPI backend
├── config.py                  # Configuration
├── requirements.txt           # Python dependencies
└── .env                       # Environment variables
```

## 🎨 UI Features

### Input Screen
- Clean symptom input form
- Quick example buttons
- Helpful placeholder text
- Clear call-to-action buttons

### Results Screen
- **Symptoms Summary** with severity badge
- **Diagnosis** with possible conditions
- **Medications** with STRONG disclaimer:
  - ⚠️ Red alert box
  - Clear warning text
  - "Do NOT take without doctor consultation"
- **Diet Recommendations**
- **Precautions & Self-Care**
- **Doctor Consultation Alert** with urgency level
- **Emergency Warning Signs**
- **General Recommendations**

## 🔒 Medical Safety Features

### Medication Disclaimers
Every medication recommendation includes:
- ⚠️ Prominent warning box
- Red color coding for visibility
- Clear text: "Do NOT take any medications without proper consultation with a qualified healthcare professional"
- Separate disclaimer section

### Urgency Levels
- **Immediate** - Seek care immediately (red)
- **Soon** - Schedule appointment soon (orange)
- **Routine** - Regular checkup (blue)

### Emergency Warnings
Specific symptoms that require immediate emergency care

## 🛠️ Configuration



### Vite Configuration
The frontend proxies API requests to the backend:
```javascript
proxy: {
  '/api': {
    target: 'http://localhost:8000',
    changeOrigin: true,
  }
}
```

## 🎯 API Response Structure

```json
{
  "symptoms": "Headache, vomiting",
  "diagnosis": "Detailed diagnosis...",
  "possible_conditions": ["Condition 1", "Condition 2"],
  "medications": ["Medicine 1", "Medicine 2"],
  "medication_disclaimer": "⚠️ IMPORTANT: Do not take any medications without proper consultation...",
  "diet": ["Diet 1", "Diet 2"],
  "precautions": "Precautions...",
  "doctor_visit": "yes",
  "urgency": "soon",
  "severity": "moderate",
  "recommendations": "Recommendations...",
  "when_to_seek_emergency": "Emergency signs..."
}
```

## 🎨 Tailwind CSS Customization

Custom colors defined in `tailwind.config.js`:
- **Primary**: Purple-blue gradient (#667eea)
- **Purple**: Deep purple (#764ba2)
- **Severity Colors**: Green (low), Yellow (moderate), Red (high)

Custom components:
- `.gradient-bg` - Background gradient
- `.card` - Card container
- `.btn-primary` - Primary button
- `.btn-secondary` - Secondary button
- `.section-card` - Result section

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints: sm, md, lg
- Flexible layouts
- Touch-friendly buttons

## 🔧 Development

### Frontend Development
```powershell
cd frontend
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview production build
```

### Backend Development
The FastAPI server auto-reloads on file changes when running with `python main.py`.

## ⚠️ Important Notes

1. **Medical Disclaimer**: This application is for informational purposes only
2. **Always Consult Professionals**: Never replace professional medical advice
3. **Medication Warning**: Prominent disclaimers on all medication recommendations
4. **API Keys**: Keep your API keys secure, don't commit to version control
5. **Emergency**: For medical emergencies, call emergency services immediately

## 🚨 Troubleshooting

### Backend won't start
- Ensure virtual environment is activated
- Check if port 8000 is available
- Verify API keys in `.env`

### Frontend won't start
- Run `npm install` in frontend directory
- Check if port 3000 is available
- Clear node_modules and reinstall if needed

### API connection errors
- Ensure backend is running on port 8000
- Check browser console for CORS errors
- Verify proxy configuration in `vite.config.js`

### Styling issues
- Run `npm install` to ensure Tailwind is installed
- Check if `tailwind.config.js` and `postcss.config.cjs` exist
- Verify imports in `index.css`

## 📄 License

For educational and demonstration purposes only.

## 🆘 Support

For issues:
1. Check both terminal outputs (backend and frontend)
2. Verify all dependencies are installed
3. Ensure API keys are valid
4. Check browser console for errors

---

**Remember**: Always consult qualified healthcare professionals for medical advice. This tool is for informational purposes only.
