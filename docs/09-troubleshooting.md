# 9. Troubleshooting

Problems are grouped by where they show up. Most first-day problems are cables, power or permissions.

## Ports and permissions

### No port appears when a board is plugged in

- Try another USB cable. Charge-only cables carry no data.
- Run `sudo dmesg | tail -20` right after plugging in. A working board shows a line with `ttyACM` or `ttyUSB`.
- If the board appears as `ttyUSB` and then disappears again, the screen-reader service `brltty` may be claiming it. Check `dmesg` for `brltty`; if it is mentioned, remove it with `sudo apt remove brltty`.

### Permission denied when opening the port

- `groups` must list `dialout`. If not, repeat the step in chapter 2 and log out and in again.
- Check the rule file from chapter 3: `ls -l /dev/so101_follower` should show a link to a device whose group is `dialout`.

### Could not connect on port

The message `Could not connect on port … Make sure you are using the correct port` means the device name does not exist or is in use.

- `ls -l $FOLLOWER_PORT $LEADER_PORT` shows whether the names exist.
- Close any other program that has the port open, including a second LeRobot command in another terminal.

## Servos

### Motor was not found during ID setup

See the check list in [chapter 4](04-servo-ids.md#if-a-servo-is-not-found): power, cable, one servo only, jumpers, USB cable.

### Motor check failed when connecting

The message lists the missing IDs.

- If all six are missing, the board has no power or the cable from the board to servo 1 is loose.
- If IDs from some number upwards are missing, the cable just before the first missing servo is loose.
- If one ID in the middle is missing, that servo has the wrong ID. Disconnect it from the chain and repeat chapter 4 for it alone.

### Servos report different firmware versions

LeRobot requires all servos on one arm to run the same firmware. Updating firmware is only possible with Feetech's Windows software:

1. Download the Feetech debugging software (FD) from [feetechrc.com/software](https://www.feetechrc.com/software.html) on a Windows PC.
2. Connect the board with the servos by USB and power. Select the COM port, set the baud rate to 1000000 and open the connection.
3. Search for the servos, select each one, and use the Upgrade tab to update it.

Do not disconnect USB or power during an update. An interrupted update can make the servo unusable.

### A servo gets hot or switches off

- The joint is pressing against its end stop or against the table. Move the leader away from that position.
- The arm has been holding a stretched-out pose for a long time. Park it.
- After an overload a servo may stay off until power is removed. Unplug the power supply for a few seconds.

## Calibration

### Calibration fails with a magnitude or range error

This usually means a joint was far from its middle position when you pressed Enter at the first prompt. Run the command again, type `c` to recalibrate, and hold the middle pose more carefully.

### Follower follows with an offset

The two arms were calibrated in different middle poses. Calibrate both again, one right after the other, using the same pose.

### LeRobot asks to calibrate although you already did

The ID on the command line does not match the file name. Check that `--robot.id` and `--teleop.id` are the values from `env.sh`, and that the files from [chapter 6](06-calibration.md#where-the-calibration-is-stored) exist. Restore them from your backup if needed.

## Teleoperation

### Follower makes a large, unexpected move at start

There is an open LeRobot issue about STS3215 servos keeping a one-turn position offset after calibration: [huggingface/lerobot issue 5324](https://github.com/huggingface/lerobot/issues/5324). Until it is resolved:

- Start with the speed limit from chapter 7 and with both arms in the same pose.
- If the move happens, stop, power-cycle the arm and calibrate it again.

### Communication errors during teleoperation

Messages such as `Incorrect status packet` or a failed read point to the physical connection.

- Press every 3-pin plug in again, especially at the wrist where the cable moves most.
- Check that the power supply is the right voltage and sits firmly in the board.
- Connect the boards directly to the Spark, not through an unpowered hub.
- Lower the loop rate with `--fps=30` as a test.

### Loop rate far below 60 Hz

Without cameras the loop should reach its target rate. A low rate without cameras points to USB problems. With cameras, lower the camera resolution or frame rate.

## Installation

### PyTorch does not see the GPU

`lerobot-info` shows `Is PyTorch built with CUDA support?: False`.

1. Check the driver: `nvidia-smi` must work and show version 580.65 or newer.
2. Check which PyTorch build is installed: `python -c "import torch; print(torch.__version__)"`. A CUDA build has a `+cu…` suffix.
3. If the build has no CUDA suffix, reinstall PyTorch from the PyTorch package index for your CUDA version, following [pytorch.org/get-started](https://pytorch.org/get-started/locally/), then install LeRobot again.

This was not tested on a Spark. The follow-me demo does not need the GPU, so this does not block chapters 3 to 8.

### A package fails to build during installation

Install the build dependencies and try again:

```bash
sudo apt install -y cmake build-essential python3-dev pkg-config libevdev-dev \
    libavformat-dev libavcodec-dev libavdevice-dev libavutil-dev \
    libswscale-dev libswresample-dev libavfilter-dev
```

### Command not found

The environment is not active. Run `source ~/so101-guide/env.sh` in every new terminal.

## Where to ask

- The LeRobot [Discord](https://discord.com/invite/s3KuuzsPFb) has active channels for the SO-101.
- Search the [LeRobot issues](https://github.com/huggingface/lerobot/issues) for the exact error text.
- When you report a problem, include the output of `lerobot-info`.
