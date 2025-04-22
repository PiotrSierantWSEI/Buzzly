# Instrukcje Docker

## Docker Compose

### 1. Uruchomienie kontenerów z pliku `docker-compose.yml`

```bash
docker-compose up
```

**Opis:**  
Uruchamia kontenery zdefiniowane w pliku `docker-compose.yml`.

**Tryb w tle:**

```bash
docker-compose up -d
```

---

### 2. Uruchamianie już powstałych kontenerów

```bash
docker-compose start
```

**Opis:**  
Uruchamia istniejące, wcześniej utworzone kontenery (które zostały wcześniej zatrzymane).

---

### 3. Wyłączenie (zatrzymanie) kontenerów

```bash
docker-compose stop
```

**Opis:**  
Zatrzymuje wszystkie działające kontenery, ale nie usuwa ich – pozostają dostępne do ponownego uruchomienia.

---

### 4. Usunięcie kontenerów

```bash
docker-compose down
```

**Opis:**  
Zatrzymuje i usuwa kontenery oraz sieci utworzone przez Docker Compose.

**Z usunięciem wolumenów:**

```bash
docker-compose down -v
```

---

## Podstawowe polecenia Dockera

### 1. Utwórz i uruchom kontener z obrazu

```bash
docker run --name <container_name> <image_name>
```

**Opis:**  
Tworzy i uruchamia nowy kontener, nadając mu nazwę `<container_name>`.

---

### 2. Uruchom kontener i mapuj porty

```bash
docker run -p <host_port>:<container_port> <image_name>
```

**Opis:**  
Przekierowuje port kontenera na port hosta.

---

### 3. Uruchom kontener w tle

```bash
docker run -d <image_name>
```

**Opis:**  
Uruchamia kontener w tle (detached mode).

---

### 4. Uruchom / Zatrzymaj kontener

```bash
docker start <container_name_or_id>
docker stop <container_name_or_id>
```

---

### 5. Usuń zatrzymany kontener

```bash
docker rm <container_name>
```

---

### 6. Otwórz powłokę w kontenerze

```bash
docker exec -it <container_name> sh
```

---

### 7. Śledź logi kontenera

```bash
docker logs -f <container_name>
```

---

### 8. Inspekcja kontenera

```bash
docker inspect <container_name_or_id>
```

---

### 9. Lista działających kontenerów

```bash
docker ps
```

---

### 10. Lista wszystkich kontenerów

```bash
docker ps --all
```

---

### 11. Statystyki zasobów kontenerów

```bash
docker container stats
```

---

## Inne przydatne polecenia Docker

```bash
docker version          # Wyświetla wersję Dockera
docker search <nazwa>   # Szuka obrazów w Docker Hub
docker pull <image>     # Pobiera obraz
docker run <opcje> <image>  # Uruchamia kontener
docker stop <id>        # Zatrzymuje kontener
docker restart <id>     # Restartuje kontener
docker kill <id>        # Wymusza zatrzymanie
docker exec -it <id> <cmd>  # Wykonuje komendę w kontenerze
docker login            # Loguje do Docker Hub
docker commit <id> <new_image> # Tworzy nowy obraz z kontenera
docker push <image>     # Wysyła obraz do rejestru
docker network <cmd>    # Zarządzanie sieciami
docker history <image>  # Historia obrazu
docker rmi <image>      # Usuwa obraz
docker ps -a            # Wszystkie kontenery
docker cp <id>:<src> <dst>   # Kopiowanie plików
docker logs <id>        # Logi z kontenera
docker volume <cmd>     # Zarządzanie wolumenami
docker logout           # Wylogowanie z Docker Hub
```

---
