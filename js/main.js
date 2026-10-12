/**
 * REHMAN ALI - DEVELOPER WEBSITE
 * Clean Interactive JavaScript Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  initProjectFilters();
  initSkillTabs();
  initCopyButtons();
  initContactForm();
  initProjectDialog();
  initMobileMenu();
  initSmoothScroll();
});

// ==========================================================================
// 1. TOAST SYSTEM
// ==========================================================================
function showToast(message, type = 'success') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  
  let iconSvg = '';
  if (type === 'success') {
    iconSvg = `<svg class="w-5 h-5 text-slate-900 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path></svg>`;
  } else {
    iconSvg = `<svg class="w-5 h-5 text-slate-700 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>`;
  }

  toast.innerHTML = `
    ${iconSvg}
    <span class="text-sm text-slate-800 font-medium">${message}</span>
  `;

  container.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('show'));

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 350);
  }, 3200);
}

// ==========================================================================
// 2. PROJECT FILTER ENGINE
// ==========================================================================
function initProjectFilters() {
  const filterPills = document.querySelectorAll('.project-filter-pill');
  const projectCards = document.querySelectorAll('.project-card');

  if (!filterPills.length || !projectCards.length) return;

  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const filter = pill.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category.includes(filter)) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

// ==========================================================================
// 3. SKILL TABS SWITCHER
// ==========================================================================
function initSkillTabs() {
  const tabs = document.querySelectorAll('.skill-tab-btn');
  const panels = document.querySelectorAll('.skill-tab-panel');

  if (!tabs.length || !panels.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const target = tab.getAttribute('data-tab');

      panels.forEach(panel => {
        if (panel.id === `tab-${target}`) {
          panel.classList.remove('hidden');
          panel.classList.add('block');
        } else {
          panel.classList.add('hidden');
          panel.classList.remove('block');
        }
      });
    });
  });
}

// ==========================================================================
// 4. COPY TO CLIPBOARD BUTTONS
// ==========================================================================
function initCopyButtons() {
  const copyButtons = document.querySelectorAll('.btn-copy');

  copyButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const textToCopy = btn.getAttribute('data-copy');
      if (!textToCopy) return;

      navigator.clipboard.writeText(textToCopy).then(() => {
        const originalContent = btn.innerHTML;
        btn.innerHTML = `
          <svg class="w-4 h-4 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path></svg>
          <span class="text-xs font-semibold text-slate-900">Copied</span>
        `;
        showToast(`Copied "${textToCopy}" to clipboard`, 'success');

        setTimeout(() => {
          btn.innerHTML = originalContent;
        }, 2200);
      }).catch(err => {
        showToast('Failed to copy to clipboard', 'warning');
      });
    });
  });
}

// ==========================================================================
// 5. CONTACT FORM & DISPATCH
// ==========================================================================
function initContactForm() {
  const form = document.getElementById('contact-form');
  const sendEmailBtn = document.getElementById('btn-send-email');
  const sendWaBtn = document.getElementById('btn-send-wa');

  if (!form) return;

  function getFormData() {
    const name = document.getElementById('contact-name')?.value.trim() || 'Prospective Client';
    const email = document.getElementById('contact-email')?.value.trim() || '';
    const service = document.getElementById('contact-service')?.value || 'Web Development';
    const message = document.getElementById('contact-message')?.value.trim() || '';

    return { name, email, service, message };
  }

  // Dispatch via WhatsApp Direct
  if (sendWaBtn) {
    sendWaBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const data = getFormData();
      if (!data.message) {
        showToast('Please enter your project message or inquiry.', 'warning');
        document.getElementById('contact-message')?.focus();
        return;
      }

      const text = `Hi Rehman Ali! My name is ${data.name} (${data.email}). I am reaching out regarding ${data.service}.\n\nProject details:\n${data.message}`;
      const encoded = encodeURIComponent(text);
      const url = `https://wa.me/923252951875?text=${encoded}`;
      
      showToast('Opening WhatsApp with your inquiry...', 'success');
      window.open(url, '_blank');
    });
  }

  // Dispatch via Email
  if (sendEmailBtn) {
    sendEmailBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const data = getFormData();
      if (!data.message) {
        showToast('Please enter your project message or inquiry.', 'warning');
        document.getElementById('contact-message')?.focus();
        return;
      }

      const subject = encodeURIComponent(`Project Inquiry: ${data.service} - ${data.name}`);
      const body = encodeURIComponent(`Hello Rehman Ali,\n\nMy name is ${data.name} (Contact: ${data.email}).\nI am contacting you regarding ${data.service}.\n\nMessage Details:\n${data.message}\n\nBest regards,\n${data.name}`);
      const mailtoUrl = `mailto:abdulrehmanb119@gmail.com?subject=${subject}&body=${body}`;

      showToast('Opening your email client...', 'success');
      window.location.href = mailtoUrl;
    });
  }
}

// ==========================================================================
// 6. PROJECT CASE STUDY DIALOG (NATIVE <dialog>)
// ==========================================================================
const PROJECT_DETAILS = {
  portal: {
    title: 'TaxLegal Enterprise Portal & Case Management Suite',
    tag: 'Flagship Enterprise Portal',
    desc: 'An end-to-end legal and tax management enterprise platform. Features real-time hearing docket management, tax return verification, automated client document vault with role-based access control, billing ledger, and KPI reporting.',
    architecture: [
      'Frontend: React 18 with high-performance responsive components',
      'Styling: Tailwind CSS + Clean Design Tokens',
      'State Management: React Context API + Local Storage offline cache',
      'Backend/Database: Firebase Firestore + Cloud Authentication',
      'Reporting Engine: Active CSS Print Engine with zero-collision printable reports'
    ],
    highlights: [
      'Over 25+ integrated modules (Tax Filings, Case Dockets, Staff Timesheets, Invoices)',
      'Ergonomic soft layout ensuring visual comfort during long operational sessions',
      'Multi-role RBAC: Administrator, Associate Lawyer, Senior Partner, and Client Viewer'
    ]
  },
  finpulse: {
    title: 'FinPulse Enterprise Accounting & Ledger System',
    tag: 'Financial Systems & Tax Auditing',
    desc: 'Automated double-entry bookkeeping and client balance reconciliation platform designed for tax consultants and law practices. Handles invoice lifecycle, partial payments, deduction calculations, and multi-year tax reports.',
    architecture: [
      'Frontend: Modern JavaScript & Component Architecture',
      'Computation: High-precision floating point rounding & automated tax brackets',
      'Export Modules: PDF statement generator and Excel-compliant CSV exports',
      'Security: Data encryption and client privacy partitioning'
    ],
    highlights: [
      'Zero math errors with automated debit/credit balancing',
      'Instant tax withholding calculations adhering to national tax regulations',
      'Automated receipt voucher generation with printable thermal & A4 templates'
    ]
  },
  cloudflow: {
    title: 'CloudFlow Microservices & Real-Time Sync API',
    tag: 'Backend Architecture & Cloud Services',
    desc: 'A robust Node.js and Python microservices orchestration backbone providing real-time data streaming, client notification dispatch, automated scheduled backup jobs, and secure webhooks for enterprise clients.',
    architecture: [
      'Backend Runtime: Node.js (Express) & Python (FastAPI)',
      'Data Layer: PostgreSQL with connection pooling & Redis caching layer',
      'Real-time: WebSocket server for live updates across multi-device sessions',
      'DevOps: Docker containers deployed with automated health monitoring'
    ],
    highlights: [
      'Sub-50ms average API response time under concurrent loads',
      'Automated nightly cloud backups to secure object storage',
      'Granular JWT authentication with role permission scopes'
    ]
  },
  automation: {
    title: 'Corporate Workflow & Cause List Automation Platform',
    tag: 'Process Digitization & Automation',
    desc: 'Digitization suite built for Nayatel & corporate legal workflows. Replaces manual paper registers and cause lists with automated case tracking, hearing reminders via WhatsApp/SMS, and automated cause list generation.',
    architecture: [
      'Interface: Clean, responsive dashboard for rapid clerical data entry',
      'Automation: Scheduled background runners for daily cause list compilation',
      'Integrations: WhatsApp API and SMS dispatch gateways for client updates'
    ],
    highlights: [
      'Reduced clerical filing turnaround by 75%',
      'Eliminated missed hearing dates with automatic 48-hour client alerts',
      'Centralized client communication records and dispatch logs'
    ]
  }
};

function initProjectDialog() {
  const dialog = document.getElementById('project-modal');
  const closeBtn = document.getElementById('modal-close-btn');
  const openButtons = document.querySelectorAll('.btn-view-project');

  if (!dialog || !closeBtn) return;

  openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = btn.getAttribute('data-project');
      const data = PROJECT_DETAILS[projectId];
      if (!data) return;

      document.getElementById('modal-title').textContent = data.title;
      document.getElementById('modal-tag').textContent = data.tag;
      document.getElementById('modal-desc').textContent = data.desc;

      const archList = document.getElementById('modal-architecture');
      archList.innerHTML = data.architecture.map(item => `
        <li class="flex items-start gap-2 text-sm text-slate-700">
          <svg class="w-4 h-4 text-slate-900 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          <span>${item}</span>
        </li>
      `).join('');

      const highList = document.getElementById('modal-highlights');
      highList.innerHTML = data.highlights.map(item => `
        <li class="flex items-start gap-2 text-sm text-slate-700">
          <svg class="w-4 h-4 text-slate-900 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
          <span>${item}</span>
        </li>
      `).join('');

      dialog.showModal();
    });
  });

  closeBtn.addEventListener('click', () => {
    dialog.close();
  });

  // Light dismiss: clicking on backdrop
  dialog.addEventListener('click', (e) => {
    const rect = dialog.getBoundingClientRect();
    const isInDialog = (
      rect.top <= e.clientY &&
      e.clientY <= rect.top + rect.height &&
      rect.left <= e.clientX &&
      e.clientX <= rect.left + rect.width
    );
    if (!isInDialog) {
      dialog.close();
    }
  });
}

// ==========================================================================
// 7. MOBILE NAVIGATION DRAWER
// ==========================================================================
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const mobileMenu = document.getElementById('mobile-nav-drawer');
  const closeBtn = document.getElementById('mobile-menu-close');
  const navLinks = document.querySelectorAll('.mobile-nav-link');

  if (!toggleBtn || !mobileMenu) return;

  function openMenu() {
    mobileMenu.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    mobileMenu.classList.add('hidden');
    document.body.style.overflow = '';
  }

  toggleBtn.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);

  navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });
}

// ==========================================================================
// 8. SMOOTH SCROLLING
// ==========================================================================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}
