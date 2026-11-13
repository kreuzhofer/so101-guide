# 2. Prepare the Spark

Install LeRobot in its own Python environment and confirm that the command-line tools and the GPU work. Nothing is plugged in yet.

You can work at the Spark's desktop or over SSH. Everything up to the follow-me demo works in a plain terminal.

## Check the system

```bash
uname -m
lsb_release -ds
python3 --version
nvidia-smi --query-gpu=name,driver_version --format=csv
```

| Check | Expected | Why it matters |
| --- | --- | --- |
| Architecture | `aarch64` | The Spark is an ARM64 machine. |
| NVIDIA driver | 580.65 or newer | The default PyTorch build for Linux needs at least this driver. |
| Python | any | The environment below brings its own Python 3.12. |

If the driver is older than 580.65, update the Spark's system software first. The follow-me demo works without the GPU, so you can also continue and fix this before chapter 10.

## Install system packages

```bash
sudo apt update
sudo apt install -y git curl ffmpeg build-essential python3-dev pkg-config cmake libevdev-dev
```

`ffmpeg` is used for video recording later. The build tools are needed because a few small Python packages may compile on ARM64 during installation.

## Install uv

`uv` creates the Python environment and installs packages. It also downloads Python 3.12 if the system does not have it.

```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

Open a new terminal afterwards so that `uv` is on the path, then check:

```bash
uv --version
```

## Create the project folder and install LeRobot

```bash
mkdir -p ~/so101
cd ~/so101
uv venv --python 3.12
source .venv/bin/activate
uv pip install 'lerobot[core_scripts,feetech]==0.7.0'
```

The two extras are all you need for this guide:

- `core_scripts` adds the tools for calibration, teleoperation, recording and visualisation.
- `feetech` adds the driver for the STS3215 servos.

The download is several gigabytes because it includes PyTorch with CUDA. The training extras are added in chapter 10.

!!! note "Why a pinned version"
    LeRobot changes quickly and command names have changed between releases. This guide matches 0.7.0. Upgrade deliberately, not by accident.

## Create the settings file

All later commands use four variables. Create one file that activates the environment and sets them:

```bash
cat > ~/so101/env.sh <<'EOF'
source ~/so101/.venv/bin/activate
export FOLLOWER_PORT=/dev/so101_follower
export LEADER_PORT=/dev/so101_leader
export FOLLOWER_ID=follower_01
export LEADER_ID=leader_01
EOF
```

From now on, start every terminal session with:

```bash
source ~/so101/env.sh
```

The two port names do not exist yet. Chapter 3 creates them. The two IDs are names you choose; LeRobot stores each arm's calibration under its ID, so keep them unchanged.

## Allow access to serial ports

On Linux a normal user may not open serial devices by default. Add yourself to the `dialout` group:

```bash
sudo usermod -aG dialout $USER
```

Log out and back in (or reboot), then confirm that `dialout` is listed:

```bash
groups
```

## Verify the installation

```bash
source ~/so101/env.sh
lerobot-info
```

Look for these lines in the output:

| Line | Expected |
| --- | --- |
| LeRobot version | `0.7.0` |
| PyTorch version | `2.15.0` or similar, with a `+cu…` suffix |
| Is PyTorch built with CUDA support? | `True` |
| GPU model | the Spark's GPU |
| FFmpeg version | a version number, not `N/A` |

Then confirm that the hardware tools start:

```bash
lerobot-setup-motors --help | head -5
lerobot-calibrate --help | head -5
lerobot-teleoperate --help | head -5
```

Each should print a usage text and not an import error.

!!! warning "If CUDA shows False"
    Check the driver version first. If the driver is new enough, see [Troubleshooting](09-troubleshooting.md#pytorch-does-not-see-the-gpu). You do not need the GPU before chapter 10.

## Checklist

- [ ] Driver version noted, 580.65 or newer
- [ ] `lerobot-info` shows version 0.7.0
- [ ] CUDA support shows True, or noted as open issue for later
- [ ] `~/so101/env.sh` exists
- [ ] `groups` lists `dialout`
