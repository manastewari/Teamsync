import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Users, Home, UserPlus, Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gradient-radial from-white via-indigo-50 to-teal-50">
      <header className="glass-card sticky top-0 z-50 border-b border-white/20">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center space-x-3">
              <div className="relative">
                <div className="absolute inset-0 bg-indigo-600 blur-sm rounded-full"></div>
                <Users className="h-8 w-8 text-white relative" />
              </div>
              <span className="text-2xl font-bold text-gradient">TeamSync</span>
            </Link>

            <nav className="hidden md:flex items-center space-x-1">
              {[
                { path: '/', icon: Home, label: 'Home' },
                { path: '/add-member', icon: UserPlus, label: 'Add Member' },
                { path: '/members', icon: Users, label: 'View Members' },
              ].map(({ path, icon: Icon, label }) => (
                <Link
                  key={path}
                  to={path}
                  className={`px-4 py-2 rounded-full transition-all duration-300 flex items-center space-x-2
                    ${isActive(path)
                      ? 'bg-gradient-to-r from-indigo-600 to-teal-500 text-white shadow-lg'
                      : 'hover:bg-white/50 text-gray-700'
                    }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{label}</span>
                </Link>
              ))}
            </nav>

            <button
              className="md:hidden relative z-50"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed inset-0 z-40 glass-card md:hidden pt-20"
        >
          <nav className="flex flex-col p-6 space-y-4">
            {[
              { path: '/', icon: Home, label: 'Home' },
              { path: '/add-member', icon: UserPlus, label: 'Add Member' },
              { path: '/members', icon: Users, label: 'View Members' },
            ].map(({ path, icon: Icon, label }) => (
              <Link
                key={path}
                to={path}
                onClick={() => setIsMenuOpen(false)}
                className={`p-4 rounded-xl flex items-center space-x-3 transition-all
                  ${isActive(path)
                    ? 'bg-gradient-to-r from-indigo-600 to-teal-500 text-white'
                    : 'hover:bg-white/50 text-gray-700'
                  }`}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{label}</span>
              </Link>
            ))}
          </nav>
        </motion.div>
      )}

      <main className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {children}
        </motion.div>
      </main>

      <footer className="glass-card mt-auto border-t border-white/20">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center">
            <p className="text-gradient font-semibold text-lg mb-2">TeamSync</p>
            <p className="text-gray-600">Empowering teams through seamless collaboration</p>
            <p className="text-sm text-gray-500 mt-4">
              © {new Date().getFullYear()} TeamSync. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;