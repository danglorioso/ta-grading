'use client';

import { useState } from 'react';

interface GraderAssignment {
  name: string;
  range: string;
  count: number;
}

export default function GradingAssignmentForm() {
  const [numSubmissions, setNumSubmissions] = useState<string>('');
  const [graderNames, setGraderNames] = useState<string>('');
  const [assignments, setAssignments] = useState<GraderAssignment[]>([]);
  const [showResults, setShowResults] = useState(false);

  const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const calculateAssignments = () => {
    const submissions = parseInt(numSubmissions);
    const graders = graderNames
      .split('\n')
      .map(name => name.trim())
      .filter(name => name.length > 0);

    if (submissions <= 0 || graders.length === 0) {
      alert('Please enter valid number of submissions and at least one grader name.');
      return;
    }

    // Calculate base number of submissions per grader
    const baseCount = Math.floor(submissions / graders.length);
    const remainder = submissions % graders.length;

    // Create assignments with base count
    let graderAssignments = graders.map(name => ({
      name,
      count: baseCount,
      range: ''
    }));

    // Randomly assign extra submissions to graders if there's a remainder
    if (remainder > 0) {
      const shuffledIndexes = shuffleArray([...Array(graders.length).keys()]);
      for (let i = 0; i < remainder; i++) {
        graderAssignments[shuffledIndexes[i]].count += 1;
      }
    }

    // Randomize the order of graders
    graderAssignments = shuffleArray(graderAssignments);

    // Calculate ranges
    let currentStart = 1;
    graderAssignments = graderAssignments.map(assignment => {
      const end = currentStart + assignment.count - 1;
      const range = assignment.count === 1 
        ? `${currentStart}` 
        : `${currentStart}-${end}`;
      currentStart = end + 1;
      
      return {
        ...assignment,
        range
      };
    });

    setAssignments(graderAssignments);
    setShowResults(true);
  };

  const resetForm = () => {
    setNumSubmissions('');
    setGraderNames('');
    setAssignments([]);
    setShowResults(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-xl border border-white/10 p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Grading Assignment Generator
          </h1>

          {!showResults ? (
            <div className="space-y-6">
              <div>
                <label htmlFor="submissions" className="block text-sm font-medium text-gray-800 mb-2">
                  Number of Student Submissions
                </label>
                <input
                  type="number"
                  id="submissions"
                  value={numSubmissions}
                  onChange={(e) => setNumSubmissions(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                  placeholder="Enter number of submissions"
                  min="1"
                />
              </div>

              <div>
                <label htmlFor="graders" className="block text-sm font-medium text-gray-800 mb-2">
                  Grader Names (one per line)
                </label>
                <textarea
                  id="graders"
                  value={graderNames}
                  onChange={(e) => setGraderNames(e.target.value)}
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                  placeholder="Enter grader names, one per line:&#10;Alice&#10;Bob&#10;Charlie"
                />
              </div>

              <button
                onClick={calculateAssignments}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium"
              >
                Generate Assignments
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="bg-green-50 border border-green-200 rounded-md p-4">
                <h2 className="text-lg font-semibold text-green-800 mb-4">
                  Grading Assignments Generated!
                </h2>
                <p className="text-green-700 mb-4">
                  Total submissions: <span className="font-medium">{numSubmissions}</span>
                </p>
                
                <div className="space-y-3">
                  {assignments.map((assignment, index) => (
                    <div key={index} className="bg-white border border-green-200 rounded-md p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-900">
                          {assignment.name}
                        </span>
                        <div className="text-right">
                          <span className="text-lg font-semibold text-blue-600">
                            {assignment.range}
                          </span>
                          <p className="text-sm text-gray-600">
                            ({assignment.count} submission{assignment.count !== 1 ? 's' : ''})
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={resetForm}
                className="w-full bg-gray-600 text-white py-3 px-4 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 font-medium"
              >
                Create New Assignment
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}