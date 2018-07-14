# AirJordans: Reviews System Design

> System design of reviews microservice inherited from a legacy-codebase for a short-term lodging listing page. Listings range from 1 to 10 million where 1 listing has about 4 reviews. This microservice can sustain about 40 million reviews with a 1200 request per second and 130ms latency. 
<img width="900" alt="screen shot 2018-07-14 at 2 32 11 pm" src="https://user-images.githubusercontent.com/30884335/42728610-0d3031ac-8773-11e8-9dbf-7be0e1b6549f.png">

## Related Projects

  - https://github.com/project-nomad/review-module
  - https://github.com/project-nomad/image-carousel-module
  - https://github.com/project-nomad/booking-module/
  - https://github.com/project-nomad/listing-description-module

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage

> Some usage instructions apply. See [Development](#development).

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc

## Development

### Installing Dependencies & Getting Started

From within the root directory:

```sh
npm install -g webpack
npm install
npm run react-dev
cd database/postgres
node generatorPSQL.js
\i /Users/{your_user_account}/Desktop/review-module/schema.sql
npm run serve
```

Navigate to http://localhost:3003/listings/1/ in your browser. 


