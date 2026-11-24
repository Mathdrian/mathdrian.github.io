/* mathdrian: kleiner Rückmeldung-Link (öffnet das Mailprogramm, speichert nichts).
   Einbinden mit einer Zeile vor </body>:
   Startseite:      <script src="feedback.js" defer></script>
   Werkzeug (2 Ebenen tiefer, z. B. 4-differentialrechnung/43-polynomfunktionen/):
                    <script src="../../feedback.js" defer></script>
   Die Nummer (z. B. 4303H) wird aus dem Dateinamen gelesen und in die Mail geschrieben. */
(function(){
  'use strict';
  if(window.__mdFeedback) return; window.__mdFeedback=true;
  var adr=['adrian_monn','me.com'].join('@');
  var file=decodeURIComponent((location.pathname.split('/').pop()||'')).replace(/\.html?$/i,'');
  var m=/^(\d{4}[HT])/.exec(file);
  var nr=m?m[1]:'';
  var titel=(document.title||'mathdrian').replace(/\s+/g,' ').trim();
  var was=nr?(nr+' '+titel):titel;
  var betreff='Rückmeldung mathdrian: '+was;
  var text='Hallo Adrian\r\n\r\nZu: '+was+'\r\nSeite: '+location.href.split('#')[0]+'\r\n\r\nMeine Rückmeldung (Fehler, Unklarheit oder Idee):\r\n\r\n\r\n(Bitte keine persönlichen Angaben wie Namen oder Schule schreiben.)';
  var a=document.createElement('a');
  a.href='mailto:'+adr+'?subject='+encodeURIComponent(betreff)+'&body='+encodeURIComponent(text);
  a.textContent='✉ Fehler melden';
  a.title='Fehler gefunden oder eine Idee? Öffnet dein Mailprogramm.';
  a.setAttribute('aria-label','Fehler melden oder Rückmeldung geben (öffnet das Mailprogramm)');
  a.className='md-feedback';
  var s=document.createElement('style');
  s.textContent='.md-feedback{position:fixed;right:10px;bottom:8px;z-index:50;font:500 12px/1.2 system-ui,-apple-system,"Segoe UI",sans-serif;'+
    'color:#566178;background:rgba(255,255,255,.88);border:1px solid rgba(86,97,120,.35);border-radius:999px;padding:5px 10px;text-decoration:none;opacity:.75}'+
    '.md-feedback:hover,.md-feedback:focus-visible{opacity:1;color:#2d56e0;border-color:#2d56e0}'+
    '@media (prefers-color-scheme:dark){.md-feedback{color:#9aa5bc;background:rgba(21,28,43,.88);border-color:rgba(154,165,188,.35)}.md-feedback:hover,.md-feedback:focus-visible{color:#7f9fff;border-color:#7f9fff}}'+
    ':root[data-theme="dark"] .md-feedback{color:#9aa5bc;background:rgba(21,28,43,.88);border-color:rgba(154,165,188,.35)}'+
    ':root[data-theme="light"] .md-feedback{color:#566178;background:rgba(255,255,255,.88);border-color:rgba(86,97,120,.35)}'+
    '@media print{.md-feedback{display:none}}';
  document.head.appendChild(s);
  document.body.appendChild(a);
})();
