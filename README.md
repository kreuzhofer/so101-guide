# SO-101 Field Guide

Documentation site for building, wiring, calibrating and teleoperating an SO-101 leader/follower pair with LeRobot 0.7 on an NVIDIA DGX Spark.

The content is Markdown in `docs/`. [MkDocs](https://www.mkdocs.org/) compiles it into a static site in `site/`.

## Build

```bash
pip install -r requirements.txt
mkdocs build
```

## Preview locally

```bash
mkdocs serve
```

## Layout

| Path | Content |
| --- | --- |
| `docs/*.md` | One file per chapter |
| `docs/assets/` | Stylesheet, script and images |
| `theme/main.html` | Page template |
| `mkdocs.yml` | Chapter order and Markdown extensions |
| `tools/make_artifact_page.py` | Prepares the entry page for publishing as a claude.ai Artifact |

The two arm images in `docs/assets/` come from [TheRobotStudio/SO-ARM100](https://github.com/TheRobotStudio/SO-ARM100) (Apache-2.0).

## Continuous build

`.github/workflows/build-site.yml` builds the site on every push and pull request. The compiled site is attached to each workflow run as the `site` artifact. The build runs in strict mode, so a broken link between chapters fails it.

Publishing to GitHub Pages is off by default. To turn it on:

1. In the repository settings, under Pages, set the source to **GitHub Actions**.
2. Under Secrets and variables → Actions → Variables, add `DEPLOY_PAGES` with the value `true`.

After that, every push to `main` publishes the site. A Pages site is public even when the repository is private.
