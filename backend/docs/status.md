100 Continue: A szerver megerősíti, hogy a kliens kérését megkapta, és további kérés várható.
101 Switching Protocols: A szerver elfogadta a kliens kérését és átváltott egy másik protokollra.



200 OK: A kérés sikeresen teljesítve.
201 Created: Az erőforrás létrejött a sikeres kérés eredményeként.
204 No Content: A szerver sikeresen feldolgozta a kérést, de nem küldött vissza tartalmat.

301 Moved Permanently: Az erőforrás állandóan áthelyezésre került.
302 Found: Az erőforrás átmenetileg áthelyezésre került.
304 Not Modified: A kérés erőforrás nem módosult azóta, hogy utoljára le lett töltve.

400 Bad Request: A kérés formátuma hibás.
401 Unauthorized: A kliens nem hitelesítette magát, vagy a hitelesítés sikertelen volt.
403 Forbidden: A kliens által küldött kérés jogosulatlan.
404 Not Found: Ez a státuszkód azt jelzi, hogy a kliens által kérdezett erőforrás nem található a szerveren. Ez lehet egy hiányzó URL, egy nem létező fájl, vagy bármely más erőforrás, amely nem érhető el a szerveren.

422 Unprocessable Entity: Ez a státuszkód azt jelzi, hogy a szerver nem tudja feldolgozni a kérést azáltal, hogy az érvényesnek tűnik, de valamilyen oknál fogva nem megfelelő. Általában a kérést kísérő adatok formátuma vagy tartalma miatt kerül sor erre a státuszkódra.




500 Internal Server Error: Általános szerverhiba történt.
503 Service Unavailable: A szerver átmenetileg nem elérhető, általában túlterheltség vagy karbantartás miatt.