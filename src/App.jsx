import React, { useState, useEffect } from 'react';
import {
  CheckCircle2,
  Circle,
  ExternalLink,
  Plus,
  ArrowLeft,
  Trash2,
  BookOpen,
  Save,
  Youtube,
  Image as ImageIcon,
  FileText,
  Headphones,
  Info,
  AlertCircle,
  Video
} from 'lucide-react';

// Color themes to make each step distinct and visually pleasing
const THEMES = {
  slate: {
    bg: 'bg-slate-50', border: 'border-slate-300', text: 'text-slate-800', iconText: 'text-slate-600', iconBg:
      'bg-slate-200', activeBorder: 'hover:border-slate-400', completedBg: 'bg-slate-100'
  },
  blue: {
    bg: 'bg-blue-50', border: 'border-blue-300', text: 'text-blue-800', iconText: 'text-blue-600', iconBg:
      'bg-blue-200', activeBorder: 'hover:border-blue-400', completedBg: 'bg-blue-100'
  },
  indigo: {
    bg: 'bg-indigo-50', border: 'border-indigo-300', text: 'text-indigo-800', iconText: 'text-indigo-600', iconBg:
      'bg-indigo-200', activeBorder: 'hover:border-indigo-400', completedBg: 'bg-indigo-100'
  },
  violet: {
    bg: 'bg-violet-50', border: 'border-violet-300', text: 'text-violet-800', iconText: 'text-violet-600', iconBg:
      'bg-violet-200', activeBorder: 'hover:border-violet-400', completedBg: 'bg-violet-100'
  },
  fuchsia: {
    bg: 'bg-fuchsia-50', border: 'border-fuchsia-300', text: 'text-fuchsia-800', iconText: 'text-fuchsia-600',
    iconBg: 'bg-fuchsia-200', activeBorder: 'hover:border-fuchsia-400', completedBg: 'bg-fuchsia-100'
  },
  pink: {
    bg: 'bg-pink-50', border: 'border-pink-300', text: 'text-pink-800', iconText: 'text-pink-600', iconBg:
      'bg-pink-200', activeBorder: 'hover:border-pink-400', completedBg: 'bg-pink-100'
  },
  rose: {
    bg: 'bg-rose-50', border: 'border-rose-300', text: 'text-rose-800', iconText: 'text-rose-600', iconBg:
      'bg-rose-200', activeBorder: 'hover:border-rose-400', completedBg: 'bg-rose-100'
  },
  orange: {
    bg: 'bg-orange-50', border: 'border-orange-300', text: 'text-orange-800', iconText: 'text-orange-600', iconBg:
      'bg-orange-200', activeBorder: 'hover:border-orange-400', completedBg: 'bg-orange-100'
  },
  amber: {
    bg: 'bg-amber-50', border: 'border-amber-300', text: 'text-amber-800', iconText: 'text-amber-600', iconBg:
      'bg-amber-200', activeBorder: 'hover:border-amber-400', completedBg: 'bg-amber-100'
  },
  red: {
    bg: 'bg-red-50', border: 'border-red-300', text: 'text-red-800', iconText: 'text-red-600', iconBg: 'bg-red-200',
    activeBorder: 'hover:border-red-400', completedBg: 'bg-red-100'
  },
};

// Define the core workflow steps with detailed non-coder instructions
const WORKFLOW_STEPS = [
  {
    id: 's1', title: '1. Decide & Log the Book', icon: BookOpen, theme: THEMES.slate,
    description: "First things first! Choose the exact book you want to make a video about. PRO TIP: Create a new folder on your computer right now (e.g., 'YT_Atomic_Habits') to store all downloaded files locally. This keeps your workflow clean!",
    hasNotes: true, notesPlaceholder: 'Example: "Atomic Habits" - I want to focus on the 4 laws of behavior change...'
  },
  {
    id: 's2', title: '2. Download Book PDF', icon: FileText, theme: THEMES.blue,
    description: "Search the internet or your personal library for the PDF version. Save it into your dedicated book folder and name it clearly (e.g., 'Atomic_Habits_Full.pdf') so the AI can read it easily."
  },
  {
    id: 's3', title: '3. Split PDF into Smaller Parts', icon: FileText, theme: THEMES.indigo,
    links: [{ label: 'Open PDFSplicer', url: 'https://onkarpawar1.github.io/PDFSplicer/' }], hasParts: true,
    description: "NotebookLM struggles with massive books. Click 'Open PDFSplicer', upload your PDF, and split it (usually into 5 pieces). Save them into your folder and name them 'Part1.pdf', 'Part2.pdf', etc."
  },
  {
    id: 's4', title: '4. Generate Audio (NotebookLM)', icon: Headphones, theme: THEMES.violet,
    links: [{ label: 'Open NotebookLM', url: 'https://notebooklm.google.com/' }],
    requiresParts: true,
    description: "Go to NotebookLM. Upload 'Part 1' and generate an 'Audio Overview'. While it generates, check the box below! Repeat this for every part."
  },
  {
    id: 's5', title: '5. Download MP3 Audio Files', icon: Headphones, theme: THEMES.fuchsia,
    description: "Once NotebookLM finishes, download the MP3s to your book folder. CRUCIAL: Rename them immediately to 'Part1_Audio.mp3', 'Part2_Audio.mp3' so they stay in the perfect order for Canva later!"
  },
  {
    id: 's6', title: '6. Generate a Background Image', icon: ImageIcon, theme: THEMES.pink,
    links: [{ label: 'Open SynthesisLab', url: 'https://onkarpawar1.github.io/SynthesisLab' }],
    description: "Your video needs a relaxing background! Click 'Open SynthesisLab' to generate a cozy desk/book image. Save the best one to your folder as 'Background.png'."
  },
  {
    id: 's7', title: '7. Convert Image to Video', icon: Video, theme: THEMES.rose,
    links: [
      { label: 'Open Gemini', url: 'https://gemini.google.com/' },
      { label: 'Open Whisk', url: 'https://labs.google/fx/tools/whisk' }
    ],
    description: "Use Gemini or Google Whisk to take your 'Background.png' and add subtle motion, turning it into a short video loop. Save the resulting video to your folder as 'Background_Loop.mp4'."
  },
  {
    id: 's8', title: '8. Merge Audio & Video in Canva', icon: Youtube, theme: THEMES.orange,
    links: [{ label: 'Open Canva', url: 'https://www.canva.com/' }],
    description: "Open Canva. Upload your 'Background_Loop.mp4' and ALL your ordered MP3s ('Part1_Audio.mp3', etc.). Drag them onto the timeline sequentially. Stretch the video to match the total audio length. Download the final MP4!"
  },
  {
    id: 's9', title: '9. Generate YouTube Metadata', icon: FileText, theme: THEMES.amber,
    links: [{ label: 'Open Claude', url: 'https://claude.ai/chat/4fd53572-793d-43e5-8a0d-face520d6329' }], hasNotes: true,
    notesPlaceholder: 'Paste your generated Title, Description, and Tags right here so you don\'t lose them!',
    description: "Click 'Open Claude'. Type in your book's name. Claude will generate your custom YouTube Title, Description, and Tags. Copy and paste them below!"
  },
  {
    id: 's10', title: '10. Upload & Publish to YouTube!', icon: Youtube, theme: THEMES.red,
    links: [{ label: 'Open YouTube Studio', url: 'https://studio.youtube.com/' }],
    description: "You made it! Create an eye-catching thumbnail. Go to YouTube Studio, upload your massive MP4 file, paste all your saved Claude metadata, and hit PUBLISH! 🎉"
  },
];

export default function App() {
  const [projects, setProjects] = useState([]);
  const [currentProjectId, setCurrentProjectId] = useState(null);
  const [newProjectName, setNewProjectName] = useState('');

  // Custom Modal State for Deletions
  const [projectToDelete, setProjectToDelete] = useState(null);

  // Animation State
  const [celebratingStep, setCelebratingStep] = useState(null);

  // Load from LocalStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('yt_workflow_projects_v2');
    if (saved) {
      try {
        setProjects(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse local storage", e);
      }
    }
  }, []);

  // Save to LocalStorage whenever projects change
  useEffect(() => {
    localStorage.setItem('yt_workflow_projects_v2', JSON.stringify(projects));
  }, [projects]);

  const createProject = (e) => {
    e.preventDefault();
    if (!newProjectName.trim()) return;

    const newProject = {
      id: Date.now().toString(),
      name: newProjectName,
      createdAt: new Date().toISOString(),
      partsCount: 5,
      steps: {},
      subSteps: {},
      notes: {}
    };

    setProjects([newProject, ...projects]);
    setNewProjectName('');
    setCurrentProjectId(newProject.id);
  };

  const confirmDeleteProject = () => {
    if (projectToDelete) {
      setProjects(projects.filter(p => p.id !== projectToDelete));
      if (currentProjectId === projectToDelete) setCurrentProjectId(null);
      setProjectToDelete(null); // Close modal
    }
  };

  const updateProject = (projectId, updater) => {
    setProjects(projects.map(p => {
      if (p.id === projectId) {
        return updater(p);
      }
      return p;
    }));
  };

  const triggerCelebration = (stepId) => {
    setCelebratingStep(stepId);
    setTimeout(() => {
      setCelebratingStep(null);
    }, 1500); // Stop after 1.5 seconds
  };

  const toggleStep = (stepId) => {
    const project = projects.find(p => p.id === currentProjectId);
    const isCurrentlyDone = project.steps[stepId];

    // If we are checking it OFF (completing it), trigger animation
    if (!isCurrentlyDone) {
      triggerCelebration(stepId);
    }

    updateProject(currentProjectId, p => ({
      ...p,
      steps: { ...p.steps, [stepId]: !p.steps[stepId] }
    }));
  };

  const toggleSubStep = (stepId, index) => {
    const key = `${stepId}_${index}`;
    updateProject(currentProjectId, p => ({
      ...p,
      subSteps: { ...p.subSteps, [key]: !p.subSteps[key] }
    }));
  };

  const updateNotes = (stepId, text) => {
    updateProject(currentProjectId, p => ({
      ...p,
      notes: { ...p.notes, [stepId]: text }
    }));
  };

  const updatePartsCount = (count) => {
    const num = parseInt(count, 10);
    if (!isNaN(num) && num > 0) {
      updateProject(currentProjectId, p => ({ ...p, partsCount: num }));
    }
  };

  const currentProject = projects.find(p => p.id === currentProjectId);

  const calculateProgress = (project) => {
    if (!project) return 0;
    const completed = WORKFLOW_STEPS.filter(s => project.steps[s.id]).length;
    return Math.round((completed / WORKFLOW_STEPS.length) * 100);
  };

  // --- VIEWS ---

  if (currentProject) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900 font-sans p-4 md:p-8 relative overflow-hidden">

        {/* CSS for Celebration Animation */}
        <style>
          {
            ` @keyframes popUp {
                0% {
                    transform: translateY(0) scale(0.5);
                    opacity: 0;
                }

                20% {
                    opacity: 1;
                    transform: translateY(-20px) scale(1.2);
                }

                80% {
                    opacity: 1;
                    transform: translateY(-60px) scale(1);
                }

                100% {
                    transform: translateY(-80px) scale(0.8);
                    opacity: 0;
                }
            }

            .emoji-pop {
                animation: popUp 1.2s cubic-bezier(0.25, 1, 0.5, 1) forwards;
                position: absolute;
                pointer-events: none;
                font-size: 2rem;
                z-index: 50;
            }

            .pop-1 {
                left: 10%;
                animation-delay: 0s;
            }

            .pop-2 {
                left: 30%;
                animation-delay: 0.1s;
                font-size: 2.5rem;
            }

            .pop-3 {
                left: 50%;
                animation-delay: 0.05s;
            }

            .pop-4 {
                left: 70%;
                animation-delay: 0.15s;
                font-size: 2.2rem;
            }

            .pop-5 {
                left: 90%;
                animation-delay: 0.08s;
            }

            `
          }
        </style>

        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200">
            <button onClick={() => setCurrentProjectId(null)}
              className="flex items-center text-slate-500 hover:text-slate-900 bg-white px-4 py-2 rounded-lg border
                border-slate-200 shadow-sm transition-all"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Dashboard
            </button>
            <div className="text-right">
              <h1 className="text-2xl font-black text-slate-800 tracking-tight">{currentProject.name}</h1>
              <span className="text-sm font-medium text-slate-400">
                Created: {new Date(currentProject.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-10 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex justify-between text-base font-bold text-slate-700 mb-3">
              <span>Overall Production Progress</span>
              <span className="text-indigo-600">{calculateProgress(currentProject)}%</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-4 overflow-hidden border border-slate-200">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full transition-all duration-700 ease-out"
                style={{ width: `${calculateProgress(currentProject)}%` }}></div>
            </div>
            {calculateProgress(currentProject) === 100 && (
              <p className="text-center text-green-600 font-bold mt-4 animate-pulse">🎉 Awesome job! Your video is
                completely finished! 🎉</p>
            )}
          </div>

          {/* Workflow Steps */}
          <div className="space-y-6 relative">
            {WORKFLOW_STEPS.map((step) => {
              const isCompleted = !!currentProject.steps[step.id];
              const StepIcon = step.icon;
              const theme = step.theme;
              const isCelebrating = celebratingStep === step.id;

              return (
                <div key={step.id} className="relative">
                  {/* Celebration Emojis overlaying this specific step */}
                  {isCelebrating && (
                    <div className="absolute inset-0 pointer-events-none">
                      <div className="emoji-pop pop-1">🎉</div>
                      <div className="emoji-pop pop-2">⭐</div>
                      <div className="emoji-pop pop-3">🚀</div>
                      <div className="emoji-pop pop-4">🔥</div>
                      <div className="emoji-pop pop-5">✨</div>
                    </div>
                  )}

                  <div className={`rounded-2xl border-2 transition-all duration-300 ${isCompleted ? `${theme.completedBg}
                    border-green-400` : `bg-white ${theme.border} ${theme.activeBorder} hover:shadow-md`}`}>

                    <div className="p-5 sm:p-6">

                      {/* Top Row: Title, Icon, Checkbox, Link */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">

                        <div className="flex items-center flex-1 cursor-pointer group" onClick={() =>
                          toggleStep(step.id)}
                        >
                          <button className="mr-4 focus:outline-none transition-transform group-hover:scale-110">
                            {isCompleted ? (
                              <CheckCircle2 className="w-9 h-9 text-green-500 fill-green-100" />
                            ) : (
                              <Circle className={`w-9 h-9 ${theme.border.replace('border-', 'text-')}
                                        group-hover:${theme.text}`} />
                            )}
                          </button>

                          <div className="flex items-center">
                            <div className={`p-3 rounded-xl mr-4 transition-colors ${isCompleted
                              ? 'bg-green-200 text-green-700' : `${theme.iconBg} ${theme.iconText}`}`}>
                              <StepIcon className="w-6 h-6" />
                            </div>
                            <h3 className={`text-xl font-bold transition-colors ${isCompleted
                              ? 'text-green-800 line-through opacity-70' : theme.text}`}>
                              {step.title}
                            </h3>
                          </div>
                        </div>

                        {step.links && (
                          <div
                            className="flex flex-wrap gap-2 w-full sm:w-auto justify-start sm:justify-end mt-2 sm:mt-0">
                            {step.links.map((link, idx) => (
                              <a key={idx} href={link.url} target="_blank" rel="noopener noreferrer" className={`flex
                                    items-center px-4 py-2.5 rounded-xl font-bold transition-transform hover:scale-105
                                    active:scale-95 text-center justify-center shadow-sm text-sm ${isCompleted
                                  ? 'bg-white text-green-700 border border-green-300' : `${theme.bg} ${theme.text}
                                    border ${theme.border} hover:brightness-95`}`} onClick={e => e.stopPropagation()}
                              >
                                {link.label}
                                <ExternalLink className="w-4 h-4 ml-1.5" />
                              </a>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Description / Instructions */}
                      <div className={`ml-0 sm:ml-16 mb-4 p-4 rounded-xl flex items-start ${isCompleted
                        ? 'bg-white/50 text-green-800/80' : `${theme.bg} text-slate-700`}`}>
                        <Info className={`w-5 h-5 mr-3 mt-0.5 flex-shrink-0 ${isCompleted ? 'text-green-600' :
                          theme.iconText}`} />
                        <p className="text-base leading-relaxed font-medium">
                          {step.description}
                        </p>
                      </div>

                      {/* Step Extras (Notes, Parts, Substeps) */}
                      <div className={`ml-0 sm:ml-16 transition-opacity ${isCompleted ? 'opacity-60' : 'opacity-100'
                        }`}>

                        {/* Part Configuration for PDF Splicer */}
                        {step.hasParts && (
                          <div className={`flex items-center p-4 rounded-xl border ${theme.border} bg-white shadow-sm
                                mb-4`}>
                            <label className="text-base font-bold text-slate-700 mr-4">
                              How many parts did you split the PDF into?
                            </label>
                            <input type="number" min="1" max="20" value={currentProject.partsCount} onChange={(e) =>
                              updatePartsCount(e.target.value)}
                              className={`w-24 p-2 border-2 ${theme.border} rounded-lg text-center text-lg font-bold
                                focus:ring-4 focus:outline-none transition-all`}
                              style={{ borderColor: 'currentColor' }}
                            />
                          </div>
                        )}

                        {/* Dynamic Checkboxes for NotebookLM Audio */}
                        {step.requiresParts && (
                          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mb-4">
                            {Array.from({ length: currentProject.partsCount }).map((_, i) => {
                              const subKey = `${step.id}_${i}`;
                              const isSubCompleted = !!currentProject.subSteps[subKey];
                              return (
                                <div key={i} onClick={() => toggleSubStep(step.id, i)}
                                  className={`flex items-center p-3 rounded-xl border-2 cursor-pointer transition-all active:scale-95 ${isSubCompleted ? 'bg-green-100 border-green-400 text-green-800 shadow-inner' : `bg-white ${theme.border} text-slate-600 hover:shadow-md`}`}
                                >
                                  {
                                    isSubCompleted ?
                                      <CheckCircle2 className="w-5 h-5 mr-2 text-green-600 fill-green-200" /> :
                                      <Circle className="w-5 h-5 mr-2 text-slate-400" />}
                                  <span className="text-base font-bold">Part {i + 1}</span>
                                </div>
                              )
                            })}
                          </div>
                        )}

                        {/* Notes / Metadata Area */}
                        {step.hasNotes && (
                          <div className="mt-2 relative">
                            <textarea placeholder={step.notesPlaceholder} value={currentProject.notes[step.id] || ''
                            } onChange={(e) => updateNotes(step.id, e.target.value)}
                              className={`w-full p-4 border-2 ${theme.border} rounded-xl focus:ring-4 focus:outline-none min-h-[140px] text-base font-mono text-slate-800 bg-white shadow-inner transition-all`}
                            />
                            {currentProject.notes[step.id] && (
                              <div className="absolute top-3 right-3 text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded">
                                Saved
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div >
    );
  }

  // --- DASHBOARD VIEW ---
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans p-4 md:p-8">

      {/* DELETE CONFIRMATION MODAL */}
      {projectToDelete && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl transform transition-all">
            <div className="flex justify-center mb-4">
              <div className="bg-red-100 p-4 rounded-full">
                <AlertCircle className="w-10 h-10 text-red-600" />
              </div>
            </div>
            <h2 className="text-2xl font-black text-center text-slate-800 mb-2">Delete Book?</h2>
            <p className="text-center text-slate-500 mb-8 font-medium">
              Are you completely sure? This will erase all progress, checkboxes, and metadata notes for this book forever.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setProjectToDelete(null)}
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-3 px-4 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteProject}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-xl shadow-md transition-colors"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight flex items-center">
              <Youtube className="w-10 h-10 text-red-600 mr-3" />
              Creator Command Center
            </h1>
            <p className="text-slate-500 mt-2 font-medium text-lg">Your automated YouTube channel pipeline.</p>
          </div>

          <form onSubmit={createProject} className="flex w-full md:w-auto shadow-sm rounded-xl overflow-hidden border-2 border-indigo-100 focus-within:border-indigo-500 transition-colors">
            <input
              type="text"
              placeholder="Enter Book Name..."
              value={newProjectName}
              onChange={(e) => setNewProjectName(e.target.value)}
              className="flex-1 md:w-72 px-5 py-4 focus:outline-none text-lg font-medium text-slate-800 placeholder-slate-400"
            />
            <button
              type="submit"
              className="bg-indigo-600 text-white px-6 py-4 hover:bg-indigo-700 transition-colors flex items-center font-bold text-lg"
            >
              <Plus className="w-6 h-6 mr-2" /> Start New Video
            </button>
          </form>
        </header>

        {/* Project Grid */}
        {projects.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-3xl border-2 border-slate-200 shadow-sm border-dashed">
            <BookOpen className="w-20 h-20 text-slate-300 mx-auto mb-6" />
            <h3 className="text-2xl font-black text-slate-700 mb-3">No Active Videos</h3>
            <p className="text-slate-500 max-w-md mx-auto text-lg font-medium">
              Type a book name in the box above and click "Start New Video" to begin your tracking process. All data saves automatically!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {projects.map(project => {
              const progress = calculateProgress(project);
              const isFinished = progress === 100;

              return (
                <div
                  key={project.id}
                  onClick={() => setCurrentProjectId(project.id)}
                  className={`bg-white rounded-2xl p-6 shadow-sm border-2 transition-all cursor-pointer group flex flex-col h-full ${isFinished ? 'border-green-400 bg-green-50/30' : 'border-slate-200 hover:border-indigo-400 hover:shadow-lg hover:-translate-y-1'}`}
                >
                  <div className="flex justify-between items-start mb-6">
                    <h3 className="text-xl font-black text-slate-800 line-clamp-2 leading-tight pr-4">
                      {project.name}
                    </h3>
                    <button
                      onClick={(e) => { e.stopPropagation(); setProjectToDelete(project.id); }}
                      className="text-slate-300 hover:text-red-600 hover:bg-red-50 p-2 rounded-lg transition-all"
                      title="Delete Project"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="mt-auto">
                    <div className="flex justify-between text-sm font-bold text-slate-600 mb-2 uppercase tracking-widest">
                      <span>Progress</span>
                      <span className={isFinished ? 'text-green-600' : 'text-indigo-600'}>{progress}%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-3 mb-4 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${isFinished ? 'bg-green-500' : 'bg-gradient-to-r from-indigo-500 to-purple-500'}`}
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                    <div className="text-sm font-medium text-slate-400 flex items-center">
                      <div className="w-2 h-2 rounded-full bg-slate-300 mr-2"></div>
                      Started {new Date(project.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

      </div>
    </div>
  );
}