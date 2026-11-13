# 1. Parts and tools

Check that everything is on the table and sort the servos before any cable is plugged in. Mixing up the leader's three servo types is the most common build mistake.

## What a two-arm set contains

| Part | Qty | Notes |
| --- | --- | --- |
| Feetech STS3215 servo | 12 | 6 for the follower, 6 for the leader. See the sorting table below. |
| Motor control board | 2 | One per arm. Usually the Waveshare Bus Servo Adapter. |
| Power supply | 2 | One per arm. The voltage must match the servo version. |
| USB-C cable | 2 | Board to Spark. Use data cables, not charge-only cables. |
| 3-pin servo cable | 12+ | One ships with each servo. |
| Table clamp | 4 | Two per arm. |
| 3D-printed parts | 2 sets | Follower set and leader set differ at the wrist and gripper. |
| Screws and horns | — | M2x6 and M3x6 screws and the horns ship with the servos. |

Tools: Phillips screwdrivers size #0 and #1, a small flat screwdriver for removing print supports, and masking tape plus a pen for labelling.

## Sort the servos

All servos are the same model, STS3215, but they come with different gear ratios. The ratio is printed on the label or on the bag (C001, C044, C046).

### Follower: six identical servos

| Servo version | Gear ratio | Qty | Used for |
| --- | --- | --- | --- |
| C001 | <span class="gear">1 / 345</span> | 6 | All six follower joints |

### Leader: three different servos

The leader needs lighter gearing on some joints so you can move it by hand while it still holds its own weight.

| ID | Joint | Gear ratio | Servo version |
| --- | --- | --- | --- |
| <span class="id">1</span> | Shoulder pan (base rotation) | <span class="gear">1 / 191</span> | C044 |
| <span class="id">2</span> | Shoulder lift | <span class="gear">1 / 345</span> | C001 |
| <span class="id">3</span> | Elbow flex | <span class="gear">1 / 191</span> | C044 |
| <span class="id">4</span> | Wrist flex | <span class="gear">1 / 147</span> | C046 |
| <span class="id">5</span> | Wrist roll | <span class="gear">1 / 147</span> | C046 |
| <span class="id">6</span> | Gripper (trigger) | <span class="gear">1 / 147</span> | C046 |

In total a set has seven C001, two C044 and three C046 servos.

!!! note "Label now, not later"
    Put a strip of tape on every servo and write the arm and the planned ID on it: `F1` to `F6` for the follower, `L1` to `L6` for the leader. Chapter 4 writes that ID into the servo.

## Check the voltage

The follower servos exist in two versions. The power supply must match.

| Servo version | Power supply | Typical use |
| --- | --- | --- |
| 7.4 V servos | 5 V supply | Standard kit, leader and follower |
| 12 V servos | 12 V supply | Optional stronger follower |

!!! danger "Do not mix supplies"
    A 12 V supply on 7.4 V servos destroys them. If your follower uses 12 V servos, mark the 12 V supply and the follower board clearly. The leader always uses 7.4 V servos.

Read the label on your servos and on both power supplies before you continue.

## Controller board

If you have the Waveshare board, check the two yellow jumpers. Both must sit on the **B** position, which selects USB. On the other position the board does not answer over USB.

Kits from other vendors may use a different board. Any board works as long as it shows up as a serial device on Linux, which chapter 3 checks.

## Printed parts

Remove all support material before assembly. Test-fit one servo into a motor holder: it should slide in with light pressure. If you print the parts yourself, the hardware repository has [print settings and gauge files](https://github.com/TheRobotStudio/SO-ARM100#printing-the-parts) to test the fit first.

## Checklist

- [ ] 12 servos sorted and labelled F1 to F6 and L1 to L6
- [ ] Leader servos match the gear ratio table
- [ ] Both power supplies match the servo voltage
- [ ] Waveshare jumpers on B, or other board identified
- [ ] Two USB-C data cables
- [ ] Printed parts cleaned, servo test-fit done
