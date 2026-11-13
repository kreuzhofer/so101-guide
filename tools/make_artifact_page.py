"""Turn the built index.html into the entry page for a claude.ai Artifact.

The Artifact host wraps the entry page in its own <html>/<head>/<body>, so this
strips those tags from the built page and keeps everything inside them. All other
pages are published unchanged.

Usage: python tools/make_artifact_page.py site/index.html site/_artifact.html
"""

import re
import sys
from pathlib import Path

src, dst = Path(sys.argv[1]), Path(sys.argv[2])
html = src.read_text(encoding="utf-8")

head = re.search(r"<head[^>]*>(.*?)</head>", html, re.S).group(1)
body = re.search(r"<body[^>]*>(.*?)</body>", html, re.S).group(1)

# The host supplies charset and viewport itself.
head = re.sub(r'<meta charset="[^"]*">\s*', "", head)
head = re.sub(r'<meta name="viewport"[^>]*>\s*', "", head)

dst.write_text(head.strip() + "\n" + body.strip() + "\n", encoding="utf-8")
print(f"wrote {dst}")
