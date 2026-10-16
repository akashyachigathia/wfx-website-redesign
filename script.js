// DESIGN NOTES — independent of your existing website buttons and links.
(() => {
  const notes = {
  "about": {
    "title": "Why I redesigned this landing page",
    "sections": [
      [
        "The opportunity",
        "WFX offers several products for fashion businesses. This concept explores how its landing page could explain that connected offering more clearly, introduce the software visually and give visitors clear next steps."
      ],
      [
        "Scope and approach",
        "This is an independent portfolio concept focused on the landing page, built with HTML, CSS and JavaScript. It is not a commissioned or launched WFX redesign. The layout draws inspiration from Katana’s website, adapted around WFX content and branding."
      ],
      [
        "What changed",
        "I introduced a dashboard-led hero, two complementary hero actions, earlier customer logos, a shared product grid and a concise everyday-features section."
      ],
      [
        "What I would validate next",
        "These are design intentions, not measured results. I would test whether visitors understand the offering, find a relevant product and recognise the demo action. The dashboard visuals are illustrative; this concept does not implement the software itself."
      ]
    ],
    "comparison": true
  },
  "hero": {
    "title": "Make the software visible from the start",
    "sections": [
      [
        "Before",
        "The original hero uses a clothing photograph and the broad message “Digitally Transform Your Fashion Business”."
      ],
      [
        "What I changed",
        "I introduced “Every fashion operation. One connected platform.” with supporting copy and an illustrative dashboard below it."
      ],
      [
        "Why",
        "The aim is to connect the promise of an integrated platform with a visual example of software, giving visitors more context before they reach the individual products."
      ]
    ],
    "comparison": true
  },
  "actions": {
    "title": "One demo action, two useful locations",
    "sections": [
      [
        "Before",
        "The original hero uses “Let’s Talk”, while the navigation includes “Contact Us”."
      ],
      [
        "What I changed",
        "I placed “Book a demo” in both the top-right navigation and below the hero text. The hero also includes “Explore the platform”."
      ],
      [
        "Why",
        "The navigation gives visitors a familiar place to find the main action. Repeating it after the introduction provides a next step once they have read the message. “Explore the platform” offers a route for people who want more information first."
      ],
      [
        "Prototype scope",
        "Both demo buttons are intended to lead to the same booking destination. This landing-page concept does not yet include a live demo form."
      ]
    ]
  },
  "trust": {
    "title": "Introduce customer recognition earlier",
    "sections": [
      [
        "Before",
        "The original customer-logo section appears after the product sections."
      ],
      [
        "What I changed",
        "I moved a compact customer-logo strip directly below the hero."
      ],
      [
        "Why",
        "This introduces recognisable customers before visitors explore the products. The intention is to provide useful reassurance early in the page; its effect has not been measured."
      ]
    ]
  },
  "products": {
    "title": "Give products a consistent overview",
    "sections": [
      [
        "Before",
        "The original page separates products into “For Brands” and “For Manufacturers”, with some products appearing in both groups."
      ],
      [
        "What I changed",
        "I brought the main offerings into a shared card grid with consistent headings, short descriptions, audience or workflow labels and product links."
      ],
      [
        "Why",
        "A shared structure is intended to make the range easier to scan and compare. Audience labels retain context about who or what each product supports."
      ],
      [
        "Work in progress",
        "The repeated dashboard imagery and additional Traceability card are still being refined. Distinct product visuals and clearer differentiation would be the next improvements."
      ]
    ]
  },
  "features": {
    "title": "Translate features into everyday work",
    "sections": [
      [
        "What I added",
        "I grouped six practical capabilities into a compact icon grid: cloud access, a visual workspace, supplier collaboration, workflow alerts, mobile access and data security."
      ],
      [
        "Why",
        "Short labels and descriptions let visitors scan how the platform could support everyday tasks. Text accompanies each icon so the meaning does not depend on recognising the symbol."
      ],
      [
        "Design intention",
        "This section is intended to support understanding after the product overview. Usability testing would help establish whether the descriptions are clear enough."
      ]
    ]
  }
};
  const toolbar = document.querySelector('.dn-toolbar');
  const toggle = document.querySelector('#dn-toggle');
  const markers = document.querySelectorAll('.dn-marker-row');
  const dialog = document.querySelector('#dn-dialog');
  const title = document.querySelector('#dn-title');
  const content = document.querySelector('#dn-content');
  const close = document.querySelector('#dn-close');
  let opener;
  toolbar.hidden = false;
  toggle.addEventListener('click', () => {
    const show = toggle.getAttribute('aria-pressed') !== 'true';
    toggle.setAttribute('aria-pressed', String(show));
    toggle.textContent = show ? 'Hide design notes' : 'View design notes';
    markers.forEach(marker => { marker.hidden = !show; });
  });
  document.querySelectorAll('[data-note]').forEach(button => {
    button.setAttribute('aria-haspopup', 'dialog');
    button.setAttribute('aria-controls', 'dn-dialog');
    button.addEventListener('click', () => {
      const note = notes[button.dataset.note];
      opener = button;
      title.textContent = note.title;
      content.replaceChildren();
      note.sections.forEach(([heading, text]) => {
        const h = document.createElement('h3');
        const p = document.createElement('p');
        h.textContent = heading;
        p.textContent = text;
        content.append(h, p);
      });
      if (note.comparison) {
        const comparison = document.createElement('div');
        comparison.className = 'dn-comparison';
        [['before', 'Before — original WFX hero'], ['after', 'After — my landing-page concept']].forEach(([file, label]) => {
          const figure = document.createElement('figure');
          const caption = document.createElement('figcaption');
          const image = document.createElement('img');
          caption.textContent = label;
          image.src = 'design-notes/' + file + '.png';
          image.alt = label;
          figure.append(caption, image);
          comparison.append(figure);
        });
        content.append(comparison);
      }
      dialog.showModal();
      dialog.scrollTop = 0;
      document.documentElement.classList.add('dn-modal-open');
      close.focus();
    });
  });
  close.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    const bounds = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) dialog.close();
  });
  dialog.addEventListener('close', () => {
    document.documentElement.classList.remove('dn-modal-open');
    opener?.focus();
  });
})();
