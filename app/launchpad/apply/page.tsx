'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwf_ozUa1p8q3ja1gi8DB4uC_4XaDM-70pGafSxbC1JDd8fZ1QMYkmsAA7IWGM3QFay8A/exec';

const SECTIONS = [
  { id: 1, title: 'Foundation', subtitle: 'Who You Are' },
  { id: 2, title: 'Vision', subtitle: 'What You\'re Building' },
  { id: 3, title: 'Traction', subtitle: 'Where You Are' },
  { id: 4, title: 'Conviction', subtitle: 'Why This Matters' },
  { id: 5, title: 'Presentation', subtitle: 'Show Your Work' },
  { id: 6, title: 'Commitment', subtitle: 'Final Step' }
];

const INITIAL_FORM_DATA = {
  // Section 1
  full_name: '',
  email: '',
  linkedin: '',
  location: '',
  job_status: '',
  team_structure: '',
  // Section 2
  pitch: '',
  problem: '',
  solution: '',
  business_model: '',
  scalability_check: '',
  // Section 3
  stage: '',
  proof_of_work: '',
  governance_status: '',
  // Section 4
  hard_thing: '',
  ethical_alignment: '',
  // Section 5
  video_url: '',
  // Section 6
  commitment: '',
  referral: ''
};

export default function LaunchpadApplyPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('launchpad_application_draft');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setFormData(parsed.formData || INITIAL_FORM_DATA);
        setCurrentStep(parsed.currentStep || 1);
      } catch (e) {
        console.error('Failed to parse saved draft', e);
      }
    }
  }, []);

  // Save to localStorage on every change
  useEffect(() => {
    localStorage.setItem('launchpad_application_draft', JSON.stringify({ formData, currentStep }));
  }, [formData, currentStep]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < 6) setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset your application? This will clear all saved data.')) {
      localStorage.removeItem('launchpad_application_draft');
      setFormData({
        full_name: '',
        email: '',
        linkedin: '',
        location: '',
        job_status: '',
        team_structure: '',
        pitch: '',
        problem: '',
        solution: '',
        business_model: '',
        scalability_check: '',
        stage: '',
        proof_of_work: '',
        governance_status: '',
        hard_thing: '',
        ethical_alignment: '',
        video_url: '',
        commitment: '',
        referral: ''
      });
      setCurrentStep(1);
      setSubmitStatus('idle');
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const formBody = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formBody.append(key, value);
      });

      await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: formBody
      });

      setSubmitStatus('success');
      setTimeout(() => {
        localStorage.removeItem('launchpad_application_draft');
      }, 2000);
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const progress = (currentStep / 6) * 100;

  return (
    <div className="apply-container">
      {/* Sticky Progress Bar */}
      <div className="apply-progress-bar">
        <div className="apply-progress-fill" style={{ width: `${progress}%` }} />
      </div>

      {/* Header */}
      <header className="apply-header">
        <Link href="/launchpad" className="apply-back-link">
          <i className="fa-solid fa-arrow-left"></i> Back to Launchpad
        </Link>
        <div className="apply-header-content">
          <div className="apply-status-badge">
            <span className="apply-status-dot"></span>
            APPLICATION PORTAL // BATCH 2026
          </div>
          <h1 className="apply-title">
            <span className="apply-title-small">MU&apos;ASSIS</span>
            <span className="apply-title-large">LAUNCHPAD APPLICATION</span>
          </h1>
          <p className="apply-subtitle">
            Step {currentStep} of 6: {SECTIONS[currentStep - 1].title}
          </p>
        </div>
        <button onClick={handleReset} className="apply-reset-btn" type="button">
          <i className="fa-solid fa-rotate-left"></i> Reset
        </button>
      </header>

      {/* Form Content */}
      <main className="apply-main">
        <div className="apply-form-container">
          {/* Section 1: Foundation */}
          {currentStep === 1 && (
            <div className="apply-section">
              <div className="apply-section-header">
                <span className="apply-section-number">01</span>
                <div>
                  <h2>Foundation</h2>
                  <p>Who You Are</p>
                </div>
              </div>
              <div className="apply-form-grid">
                <div className="apply-form-field">
                  <label htmlFor="full_name">Full Name *</label>
                  <input
                    id="full_name"
                    name="full_name"
                    type="text"
                    value={formData.full_name}
                    onChange={(e) => handleInputChange('full_name', e.target.value)}
                    required
                  />
                </div>
                <div className="apply-form-field">
                  <label htmlFor="email">Email *</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                  />
                </div>
                <div className="apply-form-field">
                  <label htmlFor="linkedin">LinkedIn Profile</label>
                  <input
                    id="linkedin"
                    name="linkedin"
                    type="url"
                    placeholder="https://linkedin.com/in/..."
                    value={formData.linkedin}
                    onChange={(e) => handleInputChange('linkedin', e.target.value)}
                  />
                </div>
                <div className="apply-form-field">
                  <label htmlFor="location">Location *</label>
                  <input
                    id="location"
                    name="location"
                    type="text"
                    placeholder="City, State/Country"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    required
                  />
                </div>
                <div className="apply-form-field apply-form-field-full">
                  <label htmlFor="job_status">Current Employment Status *</label>
                  <select
                    id="job_status"
                    name="job_status"
                    value={formData.job_status}
                    onChange={(e) => handleInputChange('job_status', e.target.value)}
                    required
                  >
                    <option value="">Select...</option>
                    <option value="full-time-founder">Full-time Founder</option>
                    <option value="part-time-founder">Part-time Founder (employed elsewhere)</option>
                    <option value="student">Student</option>
                    <option value="employed">Employed (exploring ventures)</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="apply-form-field apply-form-field-full">
                  <label htmlFor="team_structure">Team Structure *</label>
                  <textarea
                    id="team_structure"
                    name="team_structure"
                    rows={3}
                    placeholder="Describe your current team (solo, co-founders, advisors, etc.)"
                    value={formData.team_structure}
                    onChange={(e) => handleInputChange('team_structure', e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {/* Section 2: Vision */}
          {currentStep === 2 && (
            <div className="apply-section">
              <div className="apply-section-header">
                <span className="apply-section-number">02</span>
                <div>
                  <h2>Vision</h2>
                  <p>What You&apos;re Building</p>
                </div>
              </div>
              <div className="apply-form-grid">
                <div className="apply-form-field apply-form-field-full">
                  <label htmlFor="pitch">One-Line Pitch *</label>
                  <input
                    id="pitch"
                    name="pitch"
                    type="text"
                    placeholder="Describe your venture in one sentence"
                    value={formData.pitch}
                    onChange={(e) => handleInputChange('pitch', e.target.value)}
                    required
                  />
                </div>
                <div className="apply-form-field apply-form-field-full">
                  <label htmlFor="problem">Problem Statement *</label>
                  <textarea
                    id="problem"
                    name="problem"
                    rows={4}
                    placeholder="What problem are you solving? Who experiences it?"
                    value={formData.problem}
                    onChange={(e) => handleInputChange('problem', e.target.value)}
                    required
                  />
                </div>
                <div className="apply-form-field apply-form-field-full">
                  <label htmlFor="solution">Your Solution *</label>
                  <textarea
                    id="solution"
                    name="solution"
                    rows={4}
                    placeholder="How does your venture solve this problem?"
                    value={formData.solution}
                    onChange={(e) => handleInputChange('solution', e.target.value)}
                    required
                  />
                </div>
                <div className="apply-form-field apply-form-field-full">
                  <label htmlFor="business_model">Business Model *</label>
                  <textarea
                    id="business_model"
                    name="business_model"
                    rows={3}
                    placeholder="How do you generate revenue? Who pays?"
                    value={formData.business_model}
                    onChange={(e) => handleInputChange('business_model', e.target.value)}
                    required
                  />
                </div>
                <div className="apply-form-field apply-form-field-full">
                  <label htmlFor="scalability_check">Why Is This Scalable? *</label>
                  <textarea
                    id="scalability_check"
                    name="scalability_check"
                    rows={3}
                    placeholder="What makes this venture capable of significant growth?"
                    value={formData.scalability_check}
                    onChange={(e) => handleInputChange('scalability_check', e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {/* Section 3: Traction */}
          {currentStep === 3 && (
            <div className="apply-section">
              <div className="apply-section-header">
                <span className="apply-section-number">03</span>
                <div>
                  <h2>Traction</h2>
                  <p>Where You Are</p>
                </div>
              </div>
              <div className="apply-form-grid">
                <div className="apply-form-field apply-form-field-full">
                  <label htmlFor="stage">Current Stage *</label>
                  <select
                    id="stage"
                    name="stage"
                    value={formData.stage}
                    onChange={(e) => handleInputChange('stage', e.target.value)}
                    required
                  >
                    <option value="">Select...</option>
                    <option value="idea">Idea Stage (concept validated)</option>
                    <option value="prototype">Prototype/MVP Built</option>
                    <option value="early-customers">Early Customers (pre-revenue or initial sales)</option>
                    <option value="revenue">Revenue Generating</option>
                    <option value="scaling">Scaling (operational + financial systems in place)</option>
                  </select>
                </div>
                <div className="apply-form-field apply-form-field-full">
                  <label htmlFor="proof_of_work">Proof of Work *</label>
                  <textarea
                    id="proof_of_work"
                    name="proof_of_work"
                    rows={5}
                    placeholder="Share concrete evidence of progress: customer testimonials, revenue figures, partnerships, MVP demos, waitlist size, etc."
                    value={formData.proof_of_work}
                    onChange={(e) => handleInputChange('proof_of_work', e.target.value)}
                    required
                  />
                </div>
                <div className="apply-form-field apply-form-field-full">
                  <label htmlFor="governance_status">Governance & Legal Status *</label>
                  <select
                    id="governance_status"
                    name="governance_status"
                    value={formData.governance_status}
                    onChange={(e) => handleInputChange('governance_status', e.target.value)}
                    required
                  >
                    <option value="">Select...</option>
                    <option value="not-incorporated">Not Yet Incorporated</option>
                    <option value="pty-ltd">Pty Ltd (Australia)</option>
                    <option value="other-entity">Other Entity Type</option>
                    <option value="in-progress">Incorporation In Progress</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Section 4: Conviction */}
          {currentStep === 4 && (
            <div className="apply-section">
              <div className="apply-section-header">
                <span className="apply-section-number">04</span>
                <div>
                  <h2>Conviction</h2>
                  <p>Why This Matters</p>
                </div>
              </div>
              <div className="apply-form-grid">
                <div className="apply-form-field apply-form-field-full">
                  <label htmlFor="hard_thing">The Hardest Thing *</label>
                  <textarea
                    id="hard_thing"
                    name="hard_thing"
                    rows={5}
                    placeholder="What is the hardest challenge you're facing right now? Be specific and honest."
                    value={formData.hard_thing}
                    onChange={(e) => handleInputChange('hard_thing', e.target.value)}
                    required
                  />
                </div>
                <div className="apply-form-field apply-form-field-full">
                  <label htmlFor="ethical_alignment">Ethical Alignment *</label>
                  <textarea
                    id="ethical_alignment"
                    name="ethical_alignment"
                    rows={5}
                    placeholder="How does this venture align with your values? How do you ensure ethical integrity as you scale?"
                    value={formData.ethical_alignment}
                    onChange={(e) => handleInputChange('ethical_alignment', e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {/* Section 5: Presentation */}
          {currentStep === 5 && (
            <div className="apply-section">
              <div className="apply-section-header">
                <span className="apply-section-number">05</span>
                <div>
                  <h2>Presentation</h2>
                  <p>Show Your Work</p>
                </div>
              </div>
              <div className="apply-form-grid">
                <div className="apply-form-field apply-form-field-full">
                  <label htmlFor="video_url">Video Pitch URL (Recommended)</label>
                  <input
                    id="video_url"
                    name="video_url"
                    type="url"
                    placeholder="YouTube, Loom, or Vimeo link (2-3 minutes recommended)"
                    value={formData.video_url}
                    onChange={(e) => handleInputChange('video_url', e.target.value)}
                  />
                  <p className="apply-field-hint">
                    Share a short video introducing yourself and your venture. Not required, but highly recommended.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Section 6: Commitment */}
          {currentStep === 6 && (
            <div className="apply-section">
              <div className="apply-section-header">
                <span className="apply-section-number">06</span>
                <div>
                  <h2>Commitment</h2>
                  <p>Final Step</p>
                </div>
              </div>
              <div className="apply-form-grid">
                <div className="apply-form-field apply-form-field-full">
                  <label htmlFor="commitment">Program Commitment *</label>
                  <textarea
                    id="commitment"
                    name="commitment"
                    rows={4}
                    placeholder="The Launchpad is a 3-month intensive program. Can you commit to attending sessions, completing deliverables, and actively engaging with advisors and peers?"
                    value={formData.commitment}
                    onChange={(e) => handleInputChange('commitment', e.target.value)}
                    required
                  />
                </div>
                <div className="apply-form-field apply-form-field-full">
                  <label htmlFor="referral">How Did You Hear About Us?</label>
                  <input
                    id="referral"
                    name="referral"
                    type="text"
                    placeholder="Referral, social media, event, etc."
                    value={formData.referral}
                    onChange={(e) => handleInputChange('referral', e.target.value)}
                  />
                </div>
              </div>

              {submitStatus === 'success' && (
                <div className="apply-success-message">
                  <i className="fa-solid fa-circle-check"></i>
                  <div>
                    <strong>Application Submitted Successfully!</strong>
                    <p>We&apos;ll review your application and get back to you soon.</p>
                  </div>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="apply-error-message">
                  <i className="fa-solid fa-circle-exclamation"></i>
                  <div>
                    <strong>Submission Error</strong>
                    <p>Please try again or contact us at contact@muassis.org</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Navigation */}
          <div className="apply-nav">
            {currentStep > 1 && (
              <button onClick={handlePrev} className="apply-nav-btn apply-nav-btn-secondary" type="button">
                <i className="fa-solid fa-arrow-left"></i> Previous
              </button>
            )}
            {currentStep < 6 && (
              <button onClick={handleNext} className="apply-nav-btn apply-nav-btn-primary" type="button">
                Next <i className="fa-solid fa-arrow-right"></i>
              </button>
            )}
            {currentStep === 6 && (
              <button
                onClick={handleSubmit}
                className="apply-nav-btn apply-nav-btn-submit"
                disabled={isSubmitting || submitStatus === 'success'}
                type="button"
              >
                {isSubmitting ? (
                  <>
                    <i className="fa-solid fa-spinner fa-spin"></i> Submitting...
                  </>
                ) : submitStatus === 'success' ? (
                  <>
                    <i className="fa-solid fa-check"></i> Submitted
                  </>
                ) : (
                  <>
                    Submit Application <i className="fa-solid fa-paper-plane"></i>
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Step Indicator */}
        <aside className="apply-sidebar">
          <div className="apply-steps">
            {SECTIONS.map((section) => (
              <button
                key={section.id}
                onClick={() => setCurrentStep(section.id)}
                className={`apply-step-item ${currentStep === section.id ? 'active' : ''} ${currentStep > section.id ? 'completed' : ''}`}
                type="button"
              >
                <span className="apply-step-number">{section.id}</span>
                <div className="apply-step-content">
                  <strong>{section.title}</strong>
                  <span>{section.subtitle}</span>
                </div>
              </button>
            ))}
          </div>
        </aside>
      </main>
    </div>
  );
}
