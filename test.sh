#! /usr/bin/env bash
prj='drizzles'

read -d '' text <<- "EOF"
A       packages/drizzle/.DS_Store
M       packages/drizzle/.gitignore
A       packages/drizzle/dist/drizzle.js
M       packages/drizzle/package-lock.json
M       packages/drizzles/package.json
M       packages/drizzles/src/generateStore.js
M       packages/test/webpack.config.js
M       packages/drizzles/webpack.prod.jsx
EOF


# result=$(echo "${text}" | egrep -i -e "^[AM]\s+packages/${prj}/.*(jsx?|json)$" | cut -f2)
result=$(
    echo "${text}" |
        egrep -i -e "^[AM]\s+packages/${prj}/.*(jsx?|json)$" |
        sed 's/^[AM] *//'
)
echo "${text}"
echo .
echo "${result}"
