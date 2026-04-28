# Liantis PoC — eenmanszaak intake demo

**Dummy / proof of concept.** Niet de officiële Liantis website.

Statische kopie van `liantis.be/nl` met een geïntegreerd n8n-chatvenster dat de eenmanszaak-intake-agent aanroept. Bedoeld voor een management-demo.

## Wat het doet
- Visueel zo dicht mogelijk bij de echte landingspagina (HTML/CSS/assets gemirrord)
- Alle navigatie-links zijn uitgeschakeld (PoC blijft op één pagina)
- Google Tag Manager / tracking gestript
- `noindex, nofollow` zodat Google deze niet indexeert
- Sticky paarse banner bovenaan markeert dit als demo
- Floating chatknop rechtsonder → opent n8n eenmanszaak-intake-agent

## Chat-backend
Webhook: `https://n8n.srv923316.hstgr.cloud/webhook/73bd13aa-75a6-4171-b1d8-e416bb02183f/chat`
Workflow: `8rKLovYlnrgIsvkx` ("Eenmanszaak intake-agent (WIP)")

## Lokaal testen
```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## Disclaimer
Alle content (tekst, afbeeldingen, branding) is eigendom van Liantis VZW. Deze repo wordt enkel als interne PoC gebruikt en zal niet publiek geadverteerd worden.
