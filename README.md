# Documentation

## Installing

```bash
pnpm i
```

## Developing

```bash
pnpm start
```

## Deploy

### Use pm2 deployment

```bash
pnpm build
npm i -g pm2
pm2 start npm -- run serve -- --host 0.0.0.0
```

### Use Docker deployment

```bash
docker build -t kunlun-universal:latest .
docker run --rm -p 3000:80 kunlun-universal:latest
```
