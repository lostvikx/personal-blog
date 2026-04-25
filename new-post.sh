#!/usr/bin/env bash

set -euo pipefail

# Description: Creates a new blog post with boilerplate frontmatter.
# Usage:
#   ./new-post.sh                 -> auto-generates next filename (e.g. 011-new-post.md)
#   ./new-post.sh custom-name.md  -> uses provided filename

POSTS_DIR="src/posts"
ASSETS_DIR="assets"

mkdir -p "$POSTS_DIR" "$ASSETS_DIR"
cd "$POSTS_DIR"

generate_next_filename() {
    local last_number next_number

    last_number=$(
        find . -maxdepth 1 -type f -name '[0-9][0-9][0-9]-*.md' \
        | sed -E 's|^\./([0-9]{3})-.*|\1|' \
        | sort -n \
        | tail -1
    )

    last_number=${last_number:-0}
    next_number=$((10#$last_number + 1))

    printf "%03d-new-post.md" "$next_number"
}

filename="${1:-$(generate_next_filename)}"

if [[ -e "$filename" ]]; then
    echo "Error: '$filename' already exists."
    exit 1
fi

cat > "$filename" <<EOF
---
title: "Title for Your Epic Blog Post"
author: "Vikram S. Negi"
date: "$(date +%F)"
description: "Add a description for the article."
thumbnail: "image_720p.webp"  # Optional
tags: ["tag1", "tag2"]
---
EOF

echo "Created: $(pwd)/$filename"
echo "Assets directory: $(pwd)/assets"
