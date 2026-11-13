# 6. Calibrate

Calibration records the middle position and the range of every joint, so that both arms report the same value in the same physical pose. Without it, the follower would copy the leader with an offset.

It takes about two minutes per arm. Connect USB and power for both arms.

## What the tool does

1. It switches the servo torque off, so you can move the arm by hand.
2. You hold the arm in the **middle pose** and press Enter. This becomes the zero point of every joint.
3. You move each joint through its **full range**, one after the other, and press Enter. This records the minimum and maximum.
4. It writes the result into the servos and saves a file on the Spark.

## The middle pose

The tool prints a drawing of the pose. In words:

- Upper arm pointing straight up.
- Forearm horizontal, pointing forward.
- Wrist straight, in line with the forearm.
- Wrist roll in the middle of its rotation, jaw or handle not twisted.
- Gripper or trigger half open.

It does not need to be exact to the degree, but it should be the same pose on both arms. The official [calibration video](https://huggingface.co/docs/lerobot/so101#calibration-video) shows it.

## Follower

```bash
source ~/so101/env.sh
lerobot-calibrate \
    --robot.type=so101_follower \
    --robot.port=$FOLLOWER_PORT \
    --robot.id=$FOLLOWER_ID
```

Follow the two prompts:

```text
Move the joints to the middle of their range of motion and press ENTER....
```

Hold the arm in the middle pose and press Enter.

```text
Move ['shoulder_pan', 'shoulder_lift', 'elbow_flex', 'wrist_flex', 'gripper'] sequentially
through their entire ranges of motion.
Recording positions. Press ENTER to stop...
```

Move each listed joint slowly to both of its end stops, one joint after the other. Open and close the gripper fully. Then press Enter.

`wrist_roll` is not in the list. It can turn a full circle, so the tool gives it the full range automatically.

The tool finishes with `Calibration saved to …`.

## Leader

```bash
lerobot-calibrate \
    --teleop.type=so101_leader \
    --teleop.port=$LEADER_PORT \
    --teleop.id=$LEADER_ID
```

Same procedure. Squeeze the trigger fully and release it fully for the gripper range.

## If the command stops at the start

Before anything else the tool checks that all six servos answer. If not, it stops with `motor check failed on port …` and lists the missing IDs. Typical causes are a cable that came loose during assembly, or a servo ID that was skipped in chapter 4. Check the chain from the board to the first missing ID; every servo behind a loose plug is reported missing too. If one ID alone is missing, disconnect that servo from the chain and repeat chapter 4 for it.

The same check also compares firmware versions. If it reports different firmware, see [Troubleshooting](09-troubleshooting.md#servos-report-different-firmware-versions).

## Where the calibration is stored

| Arm | File |
| --- | --- |
| Follower | `~/.cache/huggingface/lerobot/calibration/robots/so_follower/follower_01.json` |
| Leader | `~/.cache/huggingface/lerobot/calibration/teleoperators/so_leader/leader_01.json` |

The file name is the ID from `env.sh`. If you later use a different ID, LeRobot finds no file and asks you to calibrate again.

Back up both files:

```bash
mkdir -p ~/so101/calibration-backup
cp -r ~/.cache/huggingface/lerobot/calibration/* ~/so101/calibration-backup/
```

## Calibrating again

Run the same command. The tool asks first:

```text
Press ENTER to use provided calibration file associated with the id follower_01,
or type 'c' and press ENTER to run calibration:
```

Type `c` and Enter to record a new calibration. Pressing only Enter keeps the existing file and writes it to the servos again.

Calibrate again when you have replaced a servo, re-mounted a horn, or when the follower copies the leader with a visible offset.

## Check

```bash
ls ~/.cache/huggingface/lerobot/calibration/robots/so_follower/
ls ~/.cache/huggingface/lerobot/calibration/teleoperators/so_leader/
```

Each folder should contain one `.json` file. Open one: it lists six joints, each with `id`, `homing_offset`, `range_min` and `range_max`. For every joint except `wrist_roll`, `range_min` and `range_max` should be clearly apart, by several hundred counts at least. A very small range means that joint was not moved during recording.

## Checklist

- [ ] Follower calibrated, file exists
- [ ] Leader calibrated, file exists
- [ ] Ranges in both files look plausible
- [ ] Calibration backed up
