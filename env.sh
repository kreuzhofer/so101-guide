# Settings for the SO-101 arms. Load it in every new terminal (bash):
#
#     source ~/so101-guide/env.sh
#
# It activates the Python environment in this folder and sets the four
# variables that every command in the guide uses. To change a value on one
# machine only, put the export line into env.local.sh next to this file;
# that file is loaded last and is not tracked by git.

SO101_HOME="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
export SO101_HOME

if [ -f "$SO101_HOME/.venv/bin/activate" ]; then
  source "$SO101_HOME/.venv/bin/activate"
else
  echo "No Python environment in $SO101_HOME/.venv yet. Create it as described in chapter 2." >&2
fi

# Fixed device names, created by the udev rules in chapter 3.
export FOLLOWER_PORT=/dev/so101_follower
export LEADER_PORT=/dev/so101_leader

# Names under which LeRobot stores each arm's calibration. Keep them unchanged.
export FOLLOWER_ID=follower_01
export LEADER_ID=leader_01

if [ -f "$SO101_HOME/env.local.sh" ]; then
  source "$SO101_HOME/env.local.sh"
fi
