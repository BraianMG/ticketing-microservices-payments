# Payments service

- Install dependencies: `npm install`
- Run service: `npm run start`
- Run tests: `npm run test`
- Build Docker image: `docker build -t <username>/ticketing-payments .`
- Upload image to Docker Hub: `docker push <username>/ticketing-payments`

## TODO
When running the tests for this service, jest says: `A worker process has failed to exit gracefully and has been force exited. This is likely caused by tests leaking due to improper teardown. Try running with --detectOpenHandles to find leaks. Active timers can also cause this, ensure that .unref() was called on them.`