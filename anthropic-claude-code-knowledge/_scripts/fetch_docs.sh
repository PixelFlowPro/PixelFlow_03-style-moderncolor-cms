#!/bin/bash
# usage: fetch_docs.sh <llms.txt url> <outdir> <url-prefix-to-strip> [exclude-regex]
idx=$1; out=$2; pre=$3; ex=${4:-^$}
mkdir -p "$out"; curl -s "$idx" > "$out/llms.txt"
grep -o "${pre}[^)]*\.md" "$out/llms.txt" | sort -u | grep -Ev "$ex" > "$out/.urls"
cat "$out/.urls" | xargs -P 8 -I{} bash -c 'u="{}"; p="${u#'"$pre"'}"; f="'"$out"'/$p"; mkdir -p "$(dirname "$f")"; for i in 1 2 3; do curl -sfL "$u" -o "$f" && break; sleep 2; done || echo "FAIL $u"'
echo "done $(find $out -name '*.md' | wc -l) / $(wc -l < $out/.urls)"
