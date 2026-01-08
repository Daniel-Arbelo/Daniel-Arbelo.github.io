/**
 * Template Name: Personal
 * Template URL: https://bootstrapmade.com/personal-free-resume-bootstrap-template/
 * Updated: Nov 04 2024 with Bootstrap v5.3.3
 * Author: BootstrapMade.com
 * License: https://bootstrapmade.com/license/
 */

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') &&
        !selectHeader.classList.contains('sticky-top') &&
        !selectHeader.classList.contains('fixed-top')) return;

    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });
  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init typed.js
   */
  const selectTyped = document.querySelector('.typed');
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });
  });

  /**
   * Gemini Chat Widget (via Cloudflare Worker proxy)
   */
  const chatButton = document.getElementById('gemini-chat-button');
  const chatPopup = document.getElementById('gemini-chat-popup');
  const closeChatBtn = document.getElementById('close-chat-btn');
  const sendChatBtn = document.getElementById('send-chat-btn');
  const chatInput = document.getElementById('chat-input');
  const chatBody = document.getElementById('chat-body');

  if (chatButton && chatPopup && closeChatBtn && sendChatBtn && chatInput && chatBody) {

    // Open chat on first visit
    if (!localStorage.getItem('hasVisited')) {
      chatPopup.classList.add('open');
      localStorage.setItem('hasVisited', 'true');
    }

    chatButton.addEventListener('click', () => {
      chatPopup.classList.toggle('open');
    });

    closeChatBtn.addEventListener('click', () => {
      chatPopup.classList.remove('open');
    });

    sendChatBtn.addEventListener('click', () => {
      sendMessage();
    });

    chatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        sendMessage();
      }
    });

    const sendMessage = async () => {
      const userMessage = chatInput.value.trim();
      if (userMessage === '') return;

      appendMessage(userMessage, 'user');
      chatInput.value = '';
      showLoadingIndicator();

      try {
        const botResponse = await getGeminiResponse(userMessage);
        removeLoadingIndicator();
        appendMessage(botResponse, 'bot');
      } catch (error) {
        removeLoadingIndicator();
        appendMessage('Lo siento, ha ocurrido un error. Por favor, inténtalo de nuevo.', 'bot');
        console.error('Error fetching Gemini response:', error);
      }
    };

    const appendMessage = (message, sender) => {
      const messageElement = document.createElement('div');
      messageElement.classList.add('chat-message', sender);
      // Use innerHTML to properly render line breaks from the model
      messageElement.innerHTML = String(message).replace(/\n/g, '<br>');
      chatBody.appendChild(messageElement);
      chatBody.scrollTop = chatBody.scrollHeight;
    };

    const showLoadingIndicator = () => {
      const loadingElement = document.createElement('div');
      loadingElement.classList.add('chat-message', 'bot', 'loading');
      loadingElement.innerHTML = '<span></span><span></span><span></span>';
      chatBody.appendChild(loadingElement);
      chatBody.scrollTop = chatBody.scrollHeight;
    };

    const removeLoadingIndicator = () => {
      const loadingElement = chatBody.querySelector('.loading');
      if (loadingElement) {
        chatBody.removeChild(loadingElement);
      }
    };

    const getGeminiResponse = async (userMessage) => {
      // ✅ Cloudflare Worker (proxy). If your Worker is mounted under a route like /api,
      // change this to "...workers.dev/api"
      const WORKER_URL = 'https://daniel-cv-gemini.arbelohernandezdaniel.workers.dev';

      // Basic client-side guard
      const safeUserMessage = String(userMessage || '').trim();
      if (!safeUserMessage) return '';
      if (safeUserMessage.length > 1000) {
        return 'Tu mensaje es demasiado largo. Por favor, resume un poco la pregunta.';
      }

      const systemPrompt = {
        role: "system",
        parts: [{
          text:
`Eres Daniel Arbelo Hernández, un Ingeniero Informático de 26 años. Responde a las preguntas de los visitantes en primera persona, como si fueras tú mismo. Sé amable, profesional y servicial.

Aquí está tu información:

- **Quién eres:** Soy Daniel Arbelo Hernández, un Ingeniero Informático de 26 años residente en La Orotava, Santa Cruz de Tenerife.
- **Contacto:** Mi email es arbelohernandezdaniel@gmail.com y mi teléfono es 677740949.
- **Formación:** Me gradué en Ingeniería Informática por la Universidad de La Laguna en 2023, con mención en Tecnologías de la Información.
- **Idiomas:** Hablo Español (Nativo) e Inglés (nivel B2 certificado por Cambridge).
- **Disponibilidad:** Tengo disponibilidad total, carné de conducir y vehículo propio. También poseo licencias de drones A1 y A3.

**Mi Experiencia Profesional:**
1. **Técnico Superior Ingeniero Informático en el Cabildo Insular de Tenerife (Feb 2024 - Ene 2025):**
   - Desarrollé aplicaciones multiplataforma con Flutter.
   - Creé y mantuve sitios web optimizados.
2. **Desarrollador en Ordenatech (Mar 2023 - May 2023):**
   - Desarrollé y mantuve sitios web responsivos.
   - Optimicé bases de datos y administré Windows Server.
   - Supervisé sistemas de backup.

**Mis Habilidades Técnicas:**
- **Lenguajes de Programación:** C, C++, JavaScript, TypeScript, Python, Ruby, Dart.
- **Tecnologías y Frameworks:** React.js, Vue.js, Flutter, Bootstrap, Firebase, MongoDB.
- **Infraestructura y Redes:** Google Cloud, Active Directory, PowerShell, Bash, redes LAN/WIFI, IPv4/IPv6, Firewalls.
- **Herramientas:** Visual Studio Code, GitHub, SSH, Android Studio.
- **Metodologías:** Scrum, Agile, Git.
- **Competencias Adicionales:** Desarrollo Full Stack, pruebas unitarias, aprendo rápido nuevas tecnologías, y tengo conocimientos en drones autónomos (Mission Planner, QGroundControl, MAVLink) y electrónica.

Cuando un visitante te pregunte, utiliza esta información para formular tus respuestas en primera persona. Si te preguntan algo que no está en tu currículum, puedes decir amablemente que no tienes esa información pero que pueden contactarme directamente.`
        }]
      };

      const userMessageContent = {
        role: "user",
        parts: [{ text: safeUserMessage }]
      };

      const response = await fetch(WORKER_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [userMessageContent],
          systemInstruction: systemPrompt
        })
      });

      if (!response.ok) {
        const errorBody = await response.text();
        console.error('Proxy Error Response:', errorBody);
        throw new Error(`Proxy request failed with status ${response.status}`);
      }

      const data = await response.json();

      if (
        data.candidates &&
        data.candidates.length > 0 &&
        data.candidates[0].content &&
        data.candidates[0].content.parts &&
        data.candidates[0].content.parts.length > 0
      ) {
        return data.candidates[0].content.parts[0].text;
      } else {
        if (data.promptFeedback && data.promptFeedback.blockReason) {
          console.error("Prompt was blocked:", data.promptFeedback.blockReason);
          return "No he podido procesar esa pregunta debido a políticas de seguridad. Por favor, intenta con otra pregunta.";
        }
        console.error('Invalid response structure:', data);
        return "No he recibido una respuesta válida. Inténtalo de nuevo.";
      }
    };
  }

})();
