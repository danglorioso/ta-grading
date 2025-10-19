'use client'
import React from 'react'

export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-gray-900/80 backdrop-blur border-t border-gray-600/50 mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex flex-col items-center space-y-4">
          {/* Main content */}
          <div className="text-center">
            <p className="text-gray-300 text-sm md:text-base mb-1">
              Created by{" "}
              <a
                href="https://danglorioso.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-300 underline decoration-blue-400/30 hover:decoration-blue-300/60 underline-offset-2"
              >
                Dan Glorioso
              </a>
              .
            </p>
            <p className="text-gray-400 text-s">
              © {new Date().getFullYear()} All rights reserved
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
