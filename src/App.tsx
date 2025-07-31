import React from 'react';
import { useTheme } from './context/ThemeContext';
import { themes } from './styles/themeStyles';
import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { motion, AnimatePresence } from 'framer-motion';

const App: React.FC = () => {
  const { theme } = useTheme();
  const currentTheme = themes[theme];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={theme}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={`${currentTheme.background} ${currentTheme.text} ${currentTheme.font} min-h-screen transition-all duration-700`}
      >
        <div className={`flex ${theme === 'theme2' ? 'flex-row' : 'flex-col'}`}>
          {theme === 'theme2' && <Sidebar />}
          <main className="flex-1 p-4 pt-20 md:pt-4">
            {theme !== 'theme2' && <Header />}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default App;
