#!/usr/bin/env bash
# Follow-me demo: the follower arm copies the leader arm.
#
#     ~/so101-guide/follow-me.sh
#
# Extra options are passed on to lerobot-teleoperate, for example
#     ~/so101-guide/follow-me.sh --teleop_time_s=300
set -euo pipefail

here="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$here/env.sh"

if ! command -v lerobot-teleoperate > /dev/null; then
  echo "lerobot-teleoperate not found. Install LeRobot as described in chapter 2." >&2
  exit 1
fi

for port in "$FOLLOWER_PORT" "$LEADER_PORT"; do
  if [ ! -e "$port" ]; then
    echo "Not connected: $port. Check USB cables." >&2
    exit 1
  fi
done

echo "Follow-me starts. Park the follower before pressing Ctrl+C."
exec lerobot-teleoperate \
    --robot.type=so101_follower \
    --robot.port="$FOLLOWER_PORT" \
    --robot.id="$FOLLOWER_ID" \
    --teleop.type=so101_leader \
    --teleop.port="$LEADER_PORT" \
    --teleop.id="$LEADER_ID" \
    "$@"
