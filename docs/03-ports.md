# 3. Controller boards and ports

Connect both controller boards and give each one a fixed device name. No servos are connected yet.

Linux assigns names like `/dev/ttyACM0` in the order devices are plugged in, so the leader and follower can swap names after a reboot. A swapped pair sends leader calibration to the follower. Fixed names prevent that.

## Label the boards

Stick a label on each board: **Leader** and **Follower**. If your follower uses 12 V servos, also mark its power supply.

## Find the port of each board

Plug in **both** boards by USB. Power supplies are not needed for this step. Then run:

```bash
source ~/so101/env.sh
lerobot-find-port
```

The tool lists all ports and asks you to unplug one board:

```text
Finding all available ports for the MotorsBus.
Ports before disconnecting: ['/dev/ttyACM0', '/dev/ttyACM1', ...]
Remove the USB cable from your MotorsBus and press Enter when done.
```

Unplug the **follower** board, press Enter, and note the result:

```text
The port of this MotorsBus is '/dev/ttyACM1'
Reconnect the USB cable.
```

Plug it back in. The other port belongs to the leader.

## Read each board's serial number

Each board has a USB serial number that never changes. Read it for both ports:

```bash
udevadm info -a -n /dev/ttyACM0 | grep -m1 'ATTRS{serial}'
udevadm info -a -n /dev/ttyACM1 | grep -m1 'ATTRS{serial}'
```

Each command prints one line such as `ATTRS{serial}=="5876043154"`. Write the number on the board's label.

## Create fixed names

Create a rule file and replace the two serial numbers with yours:

```bash
sudo tee /etc/udev/rules.d/99-so101.rules > /dev/null <<'EOF'
SUBSYSTEM=="tty", ATTRS{serial}=="FOLLOWER_SERIAL", SYMLINK+="so101_follower", GROUP="dialout", MODE="0660"
SUBSYSTEM=="tty", ATTRS{serial}=="LEADER_SERIAL", SYMLINK+="so101_leader", GROUP="dialout", MODE="0660"
EOF
sudo nano /etc/udev/rules.d/99-so101.rules
```

Apply the rules:

```bash
sudo udevadm control --reload-rules
sudo udevadm trigger
```

## Verify

```bash
ls -l /dev/so101_follower /dev/so101_leader
```

Both names should exist and point to a `ttyACM` device. Now unplug the follower board:

```bash
ls -l /dev/so101_follower /dev/so101_leader
```

Only `/dev/so101_leader` should remain. Plug the board back in, swap the two USB sockets, and check once more that both names still exist.

!!! note "If both boards report the same serial number"
    Some adapter boards share one serial number or have none. In that case use the names under `/dev/serial/by-path/`, which identify the USB socket. Put those paths into `~/so101/env.sh` and always use the same sockets.

## Checklist

- [ ] Boards labelled Leader and Follower
- [ ] Serial numbers written on the labels
- [ ] `/dev/so101_follower` and `/dev/so101_leader` exist
- [ ] Names survive unplugging and swapping USB sockets
