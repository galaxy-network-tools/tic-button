# Galaxy Network - TIC Button

## Using the web-ext-builder Docker image

    cd docker/web-ext-builder
    docker build -t galaxynetwork/web-ext-builder .

Check the installed version:
    docker run -ti galaxynetwork/web-ext-builder web-ext --version
    6.1.0

Build the addon:

    docker run -ti --workdir /web-ext -v ${PWD}:/web-ext galaxynetwork/web-ext-builder web-ext build

Sign the addon:

    docker run -ti --workdir /web-ext -v ${PWD}:/web-ext galaxynetwork/web-ext-builder web-ext sign --api-key=<your-api-user> --api-secret=<your-secret>
