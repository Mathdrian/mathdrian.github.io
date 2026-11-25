/* mathdrian: gemeinsames Skript für alle Seiten (Name bleibt feedback.js, damit bestehende Links weiter gehen).
   Es macht zwei Dinge:
   1. Oben links: «mathdrian» als Link zurück zur Startseite (nicht auf der Startseite selbst).
   2. Unten rechts: kleiner Knopf «Fehler melden» (öffnet das Mailprogramm, speichert nichts).
   Einbinden mit einer Zeile vor </body>:
   Startseite:  <script src="feedback.js" defer></script>
   Werkzeug (immer 2 Ebenen tief, z. B. 4-differentialrechnung/43-polynomfunktionen/):
                <script src="../../feedback.js" defer></script>
   Die Nummer (z. B. 4303H) wird aus dem Dateinamen gelesen, eine Aufgabennummer aus der Adresse (#...). */
(function(){
  'use strict';
  if(window.__mdSite) return; window.__mdSite=true;

  var cs=document.currentScript||document.querySelector('script[src$="feedback.js"]');
  var base='/';
  try{ if(cs&&cs.src) base=new URL('./',cs.src).href; }catch(e){}
  var home=base+(location.protocol==='file:'?'index.html':'');

  /* 1. Logo oben links (nicht auf der Startseite, dort gibt es schon eines) */
  if(!document.querySelector('a.logo,a.md-logo')){
    var logo=document.createElement('a');
    logo.className='md-logo';
    logo.href=home;
    logo.setAttribute('aria-label','Zur Startseite mathdrian');
    logo.title='Zur Startseite';
    logo.innerHTML='math<span>drian</span>';
    var host=document.querySelector('.wrap')||document.body;
    host.insertBefore(logo,host.firstChild);
  }

  /* 2. Rückmeldung per Mail, unten rechts */
  var adr=['adrian_monn','me.com'].join('@');
  var file=decodeURIComponent((location.pathname.split('/').pop()||'')).replace(/\.html?$/i,'');
  var m=/^(\d{4}[HT])/.exec(file);
  var nr=m?m[1]:'';
  var titel=(document.title||'mathdrian').replace(/\s+/g,' ').trim();
  var was=nr?(nr+' '+titel):titel;
  function mailto(){
    var betreff='Rückmeldung mathdrian: '+was;
    var text='Hallo Adrian\r\n\r\nZu: '+was+'\r\nSeite: '+location.href+'\r\n\r\nMeine Rückmeldung (Fehler, Unklarheit oder Idee):\r\n\r\n';
    return 'mailto:'+adr+'?subject='+encodeURIComponent(betreff)+'&body='+encodeURIComponent(text);
  }
  var a=document.createElement('a');
  a.className='md-feedback';
  a.href=mailto();
  a.textContent='✉ Fehler melden';
  a.title='Fehler gefunden oder eine Idee? Öffnet dein Mailprogramm.';
  a.setAttribute('aria-label','Fehler melden oder Rückmeldung geben (öffnet das Mailprogramm)');
  /* Adresse beim Klick neu bilden, damit die aktuelle Aufgabennummer (#...) dabei ist */
  a.addEventListener('click',function(){ a.href=mailto(); });
  document.body.appendChild(a);

  var s=document.createElement('style');
  s.textContent=
    '.md-logo{display:inline-block;margin:0 0 12px;font:700 22px/1.1 var(--font-head,"Space Grotesk",system-ui,-apple-system,"Segoe UI",sans-serif);letter-spacing:-.02em;color:var(--ink,#161d2c);text-decoration:none}'+
    '.md-logo span{color:var(--accent,#2d56e0)}'+
    '.md-logo:hover span,.md-logo:focus-visible span{text-decoration:underline;text-underline-offset:3px}'+
    '.md-logo:focus-visible{outline:2px solid var(--accent,#2d56e0);outline-offset:3px;border-radius:6px}'+
    '.md-feedback{position:fixed;right:10px;bottom:8px;z-index:50;font:500 12px/1.2 system-ui,-apple-system,"Segoe UI",sans-serif;'+
      'color:#566178;background:rgba(255,255,255,.88);border:1px solid rgba(86,97,120,.35);border-radius:999px;padding:5px 10px;text-decoration:none;opacity:.75}'+
    '.md-feedback:hover,.md-feedback:focus-visible{opacity:1;color:#2d56e0;border-color:#2d56e0}'+
    '@media (prefers-color-scheme:dark){.md-feedback{color:#9aa5bc;background:rgba(21,28,43,.88);border-color:rgba(154,165,188,.35)}.md-feedback:hover,.md-feedback:focus-visible{color:#7f9fff;border-color:#7f9fff}}'+
    ':root[data-theme="dark"] .md-feedback{color:#9aa5bc;background:rgba(21,28,43,.88);border-color:rgba(154,165,188,.35)}'+
    ':root[data-theme="light"] .md-feedback{color:#566178;background:rgba(255,255,255,.88);border-color:rgba(86,97,120,.35)}'+
    '@media print{.md-feedback,.md-logo{display:none}}';
  document.head.appendChild(s);
})();
