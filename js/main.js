/**
 * REHMAN ALI - DEVELOPER WEBSITE
 * Interactive JavaScript Engine
 * Neumorphic UI/UX Behaviors & Components
 */

document.addEventListener('DOMContentLoaded', () => {
  initTerminal();
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
    iconSvg = `<svg class="w-5 h-5 text-emerald-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path></svg>`;
  } else if (type === 'info') {
    iconSvg = `<svg class="w-5 h-5 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`;
  } else {
    iconSvg = `<svg class="w-5 h-5 text-amber-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>`;
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
// 2. INTERACTIVE TERMINAL EMULATOR
// ==========================================================================
function initTerminal() {
  const terminalInput = document.getElementById('term-input');
  const terminalBody = document.getElementById('term-body');
  const commandPills = document.querySelectorAll('.term-quick-btn');

  if (!terminalInput || !terminalBody) return;

  const commands = {
    help: () => `
<div class="terminal-output">
  <span class="text-sky-400 font-semibold">Available Commands:</span><br>
  • <span class="text-yellow-300">about</span>    : Who is Rehman Ali?<br>
  • <span class="text-yellow-300">skills</span>   : View core technical capabilities<br>
  • <span class="text-yellow-300">projects</span> : Flagship deployed systems<br>
  • <span class="text-yellow-300">contact</span>  : Reach out via Email or WhatsApp<br>
  • <span class="text-yellow-300">hire</span>     : Availability & hiring terms<br>
  • <span class="text-yellow-300">clear</span>    : Reset the terminal console
</div>`,
    about: () => `
<div class="terminal-output">
  <span class="text-emerald-400 font-bold">REHMAN ALI</span> — Full Stack Developer & Systems Architect.<br>
  Specialized in high-performance enterprise applications, resilient cloud backends, and tactile Neumorphic / Soft UI systems.<br>
  Based in Pakistan, serving global & local enterprise clients.
</div>`,
    skills: () => `
<div class="terminal-output">
  <span class="text-sky-300 font-semibold">[Frontend]</span> React, Next.js, TypeScript, Tailwind CSS, Soft UI / Neumorphism<br>
  <span class="text-sky-300 font-semibold">[Backend]</span>  Node.js, Express, Python (FastAPI/Django), REST, WebSockets<br>
  <span class="text-sky-300 font-semibold">[Cloud/DB]</span> PostgreSQL, Firebase Firestore, MongoDB, Docker, GCP
</div>`,
    projects: () => `
<div class="terminal-output">
  <span class="text-emerald-400">1. TaxLegal Enterprise Portal</span> (Full Neumorphic Portal + Legal Case Suite)<br>
  <span class="text-emerald-400">2. FinPulse Accounting Hub</span> (Tax audits, invoice engine, ledger)<br>
  <span class="text-emerald-400">3. CloudFlow Microservices Hub</span> (High-throughput API & WebSockets)<br>
  <span class="text-emerald-400">4. Internal Process Automation</span> (Nayatel & Corporate Client Workflows)
</div>`,
    contact: () => `
<div class="terminal-output">
  <span class="text-yellow-300 font-semibold">📧 Email:</span> <a href="mailto:abdulrehmanb119@gmail.com" class="text-sky-400 underline">abdulrehmanb119@gmail.com</a><br>
  <span class="text-yellow-300 font-semibold">📱 Mobile/WhatsApp:</span> <a href="https://wa.me/923252951875" target="_blank" class="text-emerald-400 underline">03252951875</a><br>
  <span class="text-yellow-300 font-semibold">⚡ Status:</span> Available for contracts & full-time roles
</div>`,
    hire: () => `
<div class="terminal-output">
  <span class="text-emerald-400 font-semibold">✔ Ready for new projects!</span><br>
  Available for full-stack web applications, portal development, ERP integrations, and UI/UX modernization.<br>
  Type <span class="text-yellow-300">contact</span> or ping directly on WhatsApp: <span class="text-emerald-300">03252951875</span>
</div>`,
    clear: () => {
      terminalBody.innerHTML = '';
      return '';
    }
  };

  function executeCommand(rawCmd) {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    if (cmd === 'clear') {
      commands.clear();
      return;
    }

    // Append executed command
    const row = document.createElement('div');
    row.innerHTML = `<span class="terminal-prompt">guest@rehman-dev:~$</span> <span class="terminal-command">${rawCmd}</span>`;
    terminalBody.appendChild(row);

    // Append response
    const outputDiv = document.createElement('div');
    if (commands[cmd]) {
      outputDiv.innerHTML = commands[cmd]();
    } else {
      outputDiv.innerHTML = `<div class="terminal-output text-rose-400">zsh: command not found: ${rawCmd}. Type <span class="text-yellow-300 underline font-semibold">help</span> to view commands.</div>`;
    }
    terminalBody.appendChild(outputDiv);
    terminalBody.scrollTop = terminalBody.scrollHeight;
  }

  terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const val = terminalInput.value;
      terminalInput.value = '';
      executeCommand(val);
    }
  });

  commandPills.forEach(pill => {
    pill.addEventListener('click', () => {
      const cmd = pill.getAttribute('data-cmd');
      executeCommand(cmd);
      terminalInput.focus();
    });
  });
}

// ==========================================================================
// 3. PROJECT FILTER ENGINE
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
// 4. SKILL TABS SWITCHER
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
// 5. COPY TO CLIPBOARD BUTTONS
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
          <svg class="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path></svg>
          <span class="text-xs font-semibold text-emerald-700">Copied!</span>
        `;
        showToast(`Copied "${textToCopy}" to clipboard!`, 'success');

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
// 6. CONTACT FORM & DISPATCH
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
      
      showToast('Opening WhatsApp with your message...', 'success');
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

      showToast('Opening your email client...', 'info');
      window.location.href = mailtoUrl;
    });
  }
}

// ==========================================================================
// 7. PROJECT CASE STUDY DIALOG (NATIVE <dialog>)
// ==========================================================================
const PROJECT_DETAILS = {
  portal: {
    title: 'TaxLegal Enterprise Portal & Case Management Suite',
    tag: 'Flagship Enterprise Portal',
    badge: 'Production Deployed',
    badgeClass: 'badge-success',
    desc: 'An end-to-end legal and tax management enterprise platform built with a high-fidelity Neumorphic Soft UI design system. Features real-time hearing docket management, tax return verification, automated client document vault with role-based access control, billing ledger, and KPI reporting.',
    architecture: [
      'Frontend: React 18 with custom Neumorphic / Soft UI components',
      'Styling: Tailwind CSS + Custom dual-shadow CSS variables',
      'State Management: React Context API + Local Storage offline sync',
      'Backend/Database: Firebase Firestore + Cloud Authentication',
      'Reporting Engine: Active CSS Print Engine with zero-collision printable reports'
    ],
    highlights: [
      'Over 25+ integrated modules (Tax Filings, Case Dockets, Staff Timesheets, Invoices)',
      'Dual-cast Neumorphic aesthetic ensuring ergonomic clarity during long legal sessions',
      'Multi-role RBAC: Administrator, Associate Lawyer, Senior Partner, and Client Viewer'
    ]
  },
  finpulse: {
    title: 'FinPulse Enterprise Accounting & Ledger System',
    tag: 'Financial Systems & Tax Auditing',
    badge: 'Enterprise Core',
    badgeClass: 'badge-vault',
    desc: 'Automated double-entry bookkeeping and client balance reconciliation platform designed for tax consultants and law practices. Handles invoice lifecycle, partial payments, deduction calculations, and multi-year tax reports.',
    architecture: [
      'Frontend: Modern JavaScript & Neumorphic Component Architecture',
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
    badge: 'High Performance',
    badgeClass: 'badge-info',
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
    title: 'Client Automation & Internal Workflow Platform',
    tag: 'Process Digitization & Automation',
    badge: 'Operational Automation',
    badgeClass: 'badge-warning',
    desc: 'Digitization suite built for Nayatel & corporate legal workflows. Replaces manual paper registers and cause lists with automated case tracking, hearing reminders via WhatsApp/SMS, and automated cause list generation.',
    architecture: [
      'Interface: Clean, responsive Neumorphic dashboard for quick clerical data entry',
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
      
      const badgeEl = document.getElementById('modal-badge');
      badgeEl.className = data.badgeClass;
      badgeEl.textContent = data.badge;

      document.getElementById('modal-desc').textContent = data.desc;

      const archList = document.getElementById('modal-architecture');
      archList.innerHTML = data.architecture.map(item => `
        <li class="flex items-start gap-2 text-sm text-slate-700">
          <svg class="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          <span>${item}</span>
        </li>
      `).join('');

      const highList = document.getElementById('modal-highlights');
      highList.innerHTML = data.highlights.map(item => `
        <li class="flex items-start gap-2 text-sm text-slate-700">
          <svg class="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
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
// 8. MOBILE NAVIGATION DRAWER
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
// 9. SMOOTH SCROLLING
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
