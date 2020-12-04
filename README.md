# Hidden JVC Website

## build

    docker build --tag hidden-jvc-website-image .
    docker run -p 9898:80 --name hidden-jvc-website-container hidden-jvc-website-image