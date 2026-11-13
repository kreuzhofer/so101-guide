# Command reference

Every command of this guide on one page. All of them assume that the environment is loaded:

```bash
source ~/so101-guide/env.sh
```

## Settings

| Variable | Value in this guide | Meaning |
| --- | --- | --- |
| `FOLLOWER_PORT` | `/dev/so101_follower` | Fixed device name of the follower board |
| `LEADER_PORT` | `/dev/so101_leader` | Fixed device name of the leader board |
| `FOLLOWER_ID` | `follower_01` | Name of the follower's calibration |
| `LEADER_ID` | `leader_01` | Name of the leader's calibration |

## Joints and IDs

| ID | Joint | Leader gear ratio | Follower gear ratio |
| --- | --- | --- | --- |
| <span class="id">1</span> | `shoulder_pan` | <span class="gear">1 / 191</span> | <span class="gear">1 / 345</span> |
| <span class="id">2</span> | `shoulder_lift` | <span class="gear">1 / 345</span> | <span class="gear">1 / 345</span> |
| <span class="id">3</span> | `elbow_flex` | <span class="gear">1 / 191</span> | <span class="gear">1 / 345</span> |
| <span class="id">4</span> | `wrist_flex` | <span class="gear">1 / 147</span> | <span class="gear">1 / 345</span> |
| <span class="id">5</span> | `wrist_roll` | <span class="gear">1 / 147</span> | <span class="gear">1 / 345</span> |
| <span class="id">6</span> | `gripper` | <span class="gear">1 / 147</span> | <span class="gear">1 / 345</span> |

## System

```bash
# Version, GPU and ffmpeg in one report
lerobot-info

# Which port belongs to which board
lerobot-find-port

# Do the fixed names exist?
ls -l $FOLLOWER_PORT $LEADER_PORT
```

## Servo IDs

One servo connected at a time, in the order gripper to shoulder pan.

```bash
lerobot-setup-motors --robot.type=so101_follower --robot.port=$FOLLOWER_PORT
```

```bash
lerobot-setup-motors --teleop.type=so101_leader --teleop.port=$LEADER_PORT
```

## Calibration

```bash
lerobot-calibrate --robot.type=so101_follower --robot.port=$FOLLOWER_PORT --robot.id=$FOLLOWER_ID
```

```bash
lerobot-calibrate --teleop.type=so101_leader --teleop.port=$LEADER_PORT --teleop.id=$LEADER_ID
```

```bash
# Back up the calibration files
cp -r ~/.cache/huggingface/lerobot/calibration/* ~/so101-guide/calibration-backup/
```

## Follow-me

```bash
~/so101-guide/follow-me.sh
```

```bash
# The full command behind the script
lerobot-teleoperate \
    --robot.type=so101_follower --robot.port=$FOLLOWER_PORT --robot.id=$FOLLOWER_ID \
    --teleop.type=so101_leader --teleop.port=$LEADER_PORT --teleop.id=$LEADER_ID
```

| Option | Effect |
| --- | --- |
| `--robot.max_relative_target=3` | Limit movement per step |
| `--fps=30` | Lower the loop rate from 60 |
| `--teleop_time_s=120` | Stop after 120 seconds |
| `--display_data=true` | Live view in Rerun |

## Cameras

```bash
lerobot-find-cameras opencv
```

## Files and folders

| Path | Content |
| --- | --- |
| `~/so101-guide/` | Clone of this guide's repository |
| `~/so101-guide/.venv/` | Python environment with LeRobot 0.7.0, not tracked by git |
| `~/so101-guide/env.sh` | Activates the environment and sets the four variables |
| `~/so101-guide/env.local.sh` | Optional local overrides, not tracked by git |
| `~/so101-guide/follow-me.sh` | Demo script |
| `~/so101-guide/calibration-backup/` | Copy of the calibration files, not tracked by git |
| `/etc/udev/rules.d/99-so101.rules` | Fixed device names |
| `~/.cache/huggingface/lerobot/calibration/` | Calibration files used by LeRobot |

## Sources

- [LeRobot SO-101 tutorial](https://huggingface.co/docs/lerobot/so101)
- [LeRobot installation](https://huggingface.co/docs/lerobot/installation)
- [SO-ARM100 hardware repository](https://github.com/TheRobotStudio/SO-ARM100)
- [LeRobot source code](https://github.com/huggingface/lerobot)
