# 4. Servo IDs

Write a unique ID and the common baud rate into each servo. New servos all ship with ID 1, so they must be configured one at a time before they share a cable.

The ID is stored inside the servo. You do this once per servo, and it stays valid on any computer.

## ID plan

Both arms use the same numbering, from the base upwards.

| ID | Joint name in LeRobot | Where it sits |
| --- | --- | --- |
| <span class="id">1</span> | `shoulder_pan` | Base rotation |
| <span class="id">2</span> | `shoulder_lift` | Shoulder |
| <span class="id">3</span> | `elbow_flex` | Elbow |
| <span class="id">4</span> | `wrist_flex` | Wrist pitch |
| <span class="id">5</span> | `wrist_roll` | Wrist rotation |
| <span class="id">6</span> | `gripper` | Gripper, or trigger on the leader |

The tool works **backwards**: it asks for the gripper servo (ID 6) first and the shoulder pan servo (ID 1) last.

## Before you start

- Servos are loose on the table, sorted and labelled as in chapter 1.
- The board has USB **and** its power supply connected.
- Exactly **one** servo is connected to the board at any time.

!!! danger "One servo at a time"
    If two servos with the same ID are connected, the tool may write to the wrong one or fail. Never chain servos during this chapter.

## Follower

Connect the follower board to USB and power, then run:

```bash
source ~/so101/env.sh
lerobot-setup-motors \
    --robot.type=so101_follower \
    --robot.port=$FOLLOWER_PORT
```

The tool prompts:

```text
Connect the controller board to the 'gripper' motor only and press enter.
```

1. Plug servo **F6** into the board with a 3-pin cable.
2. Press Enter. The tool answers `'gripper' motor id set to 6`.
3. Unplug the cable **at the board**. Leave it in the servo; it will be needed during assembly.
4. Take a new cable, plug in the next servo the tool asks for, and repeat.

The order of prompts is:

| Prompt | Servo to connect |
| --- | --- |
| `gripper` | F6 |
| `wrist_roll` | F5 |
| `wrist_flex` | F4 |
| `elbow_flex` | F3 |
| `shoulder_lift` | F2 |
| `shoulder_pan` | F1 |

The command ends without a message after the sixth servo.

## Leader

Switch to the leader board and its power supply:

```bash
lerobot-setup-motors \
    --teleop.type=so101_leader \
    --teleop.port=$LEADER_PORT
```

The prompts are the same. Here the gear ratio matters, so connect exactly the servo you labelled for each joint:

| Prompt | Servo to connect | Gear ratio |
| --- | --- | --- |
| `gripper` | L6 | <span class="gear">1 / 147</span> |
| `wrist_roll` | L5 | <span class="gear">1 / 147</span> |
| `wrist_flex` | L4 | <span class="gear">1 / 147</span> |
| `elbow_flex` | L3 | <span class="gear">1 / 191</span> |
| `shoulder_lift` | L2 | <span class="gear">1 / 345</span> |
| `shoulder_pan` | L1 | <span class="gear">1 / 191</span> |

## If a servo is not found

The tool stops with `Motor '…' was not found. Make sure it is connected.` Check, in this order:

1. The power supply is plugged into the board and switched on.
2. The 3-pin cable is fully seated at both ends.
3. Only one servo is connected.
4. On a Waveshare board, both jumpers are on **B**.
5. The USB cable is a data cable.

Then run the command again. Servos that are already configured are found again and simply rewritten, so repeating the whole sequence is safe.

## Check

There is no separate check command. The real test comes in chapter 6: calibration connects to all six servos of the chain and stops with an error if one is missing.

A quick sanity check now is the labels: twelve servos, each with a cable plugged in, each ticked off once.

## Checklist

- [ ] F6 to F1 configured, each confirmed with `motor id set to …`
- [ ] L6 to L1 configured, each matching the gear ratio table
- [ ] Every servo still carries its label and one cable
