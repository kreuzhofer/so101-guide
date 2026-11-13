# 7. Follow-me demo

Run teleoperation: you move the leader, the follower copies it. Then wrap the command in a script you can start in front of an audience.

## Before the first run

- Both arms are powered, connected by USB and clamped to the table.
- Nothing is inside the follower's reach: no cables, cups or hands.
- **Put both arms into roughly the same pose.** When teleoperation starts, the follower moves to the leader's pose at once. The closer the two poses are, the smaller that first movement.
- Keep one hand near the follower's power plug during the first run.

!!! danger "The follower goes limp when you stop"
    When the program ends, LeRobot switches the follower's torque off and the arm drops under its own weight. Before you stop, move the leader so that the follower rests on the table or in a low folded pose, or hold the follower with your free hand.

## First run with a speed limit

For the very first test, limit how far the follower may move per control step. It then approaches the leader's pose gradually and lags behind fast movements.

```bash
source ~/so101/env.sh
lerobot-teleoperate \
    --robot.type=so101_follower \
    --robot.port=$FOLLOWER_PORT \
    --robot.id=$FOLLOWER_ID \
    --robot.max_relative_target=3 \
    --teleop.type=so101_leader \
    --teleop.port=$LEADER_PORT \
    --teleop.id=$LEADER_ID
```

The value is in degrees per step. The loop runs at up to 60 steps per second, so `3` allows roughly 180 degrees per second. Treat the number as a starting point; it was not tuned on real arms.

Move one leader joint at a time and check each line of this table:

| Move on the leader | Follower should |
| --- | --- |
| Rotate the base left and right | Rotate the same way |
| Lift and lower the shoulder | Lift and lower |
| Bend and stretch the elbow | Bend and stretch |
| Tilt the wrist up and down | Tilt the same way |
| Twist the wrist | Twist the same way |
| Squeeze and release the trigger | Close and open the gripper |

Stop with `Ctrl+C`. The terminal prints a summary of the loop timing.

## Normal run

When all six joints follow correctly, remove the limit:

```bash
lerobot-teleoperate \
    --robot.type=so101_follower \
    --robot.port=$FOLLOWER_PORT \
    --robot.id=$FOLLOWER_ID \
    --teleop.type=so101_leader \
    --teleop.port=$LEADER_PORT \
    --teleop.id=$LEADER_ID
```

While it runs, the terminal shows one line that updates in place:

```text
Teleop loop time: 16.67ms (60 Hz)
```

A rate near 60 Hz means the loop keeps up. A much lower rate points to a USB or cable problem.

## Useful options

| Option | Effect |
| --- | --- |
| `--fps=30` | Lower the loop rate. The default is 60. |
| `--teleop_time_s=120` | Stop automatically after 120 seconds. |
| `--robot.max_relative_target=3` | Limit the movement per step, as in the first run. |
| `--display_data=true` | Open the Rerun viewer with live joint values. Needs a desktop session on the Spark. |

## Demo script

Create a script that starts the demo with one word:

```bash
cat > ~/so101/follow-me.sh <<'EOF'
#!/usr/bin/env bash
set -euo pipefail
source ~/so101/env.sh

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
EOF
chmod +x ~/so101/follow-me.sh
```

Start it with:

```bash
~/so101/follow-me.sh
```

Extra options are passed through, for example `~/so101/follow-me.sh --teleop_time_s=300`.

## Before a live demo

- [ ] Run the demo once from a cold start: power on, plug in, start the script.
- [ ] Agree on a parking pose for the follower and practise stopping from it.
- [ ] Tape or tie down both USB cables and both power cables.
- [ ] Keep objects for the gripper light and soft. The gripper's force is deliberately limited.
- [ ] Do not let the servos hold a stretched-out pose for many minutes; they get warm.

## If something is wrong

| Symptom | Likely cause | Fix |
| --- | --- | --- |
| Follower mirrors with a constant offset | Middle poses differed between the arms | Calibrate both arms again, chapter 6 |
| One joint moves the wrong way or the wrong joint moves | Servo IDs swapped | Repeat chapter 4 for the two servos involved |
| A leader joint is very stiff or very loose | Wrong gear ratio in that position | Compare with the table in chapter 1 |
| Follower jumps a full turn at start | Known open issue with the position offset | See [Troubleshooting](09-troubleshooting.md#follower-makes-a-large-unexpected-move-at-start) |
| Program stops with a packet or read error | Loose cable or weak power | See [Troubleshooting](09-troubleshooting.md#communication-errors-during-teleoperation) |
