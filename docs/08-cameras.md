# 8. Cameras

Cameras are not needed for the follow-me demo. They become necessary as soon as you record data for training, because the camera images are what a policy learns from.

This chapter adds two USB cameras and shows them live during teleoperation.

## Recommended setup

| Camera | Name used in this guide | Position |
| --- | --- | --- |
| Wrist camera | `wrist` | Mounted on the follower's gripper, looking at the jaws |
| Overview camera | `top` | Fixed above or in front of the workspace |

The hardware repository has printable [wrist and overhead camera mounts](https://github.com/TheRobotStudio/SO-ARM100#optional-hardware).

Plug the cameras directly into the Spark or into a powered USB hub. Two cameras on an unpowered hub often fail to deliver 30 frames per second.

## Find the cameras

```bash
source ~/so101/env.sh
lerobot-find-cameras opencv
```

The tool lists every camera with its `Id` and default resolution, and saves one test image per camera to `outputs/captured_images/`. Open the images to see which ID is which camera.

!!! warning "Camera IDs can change"
    The numeric IDs depend on the order in which cameras are plugged in. After a reboot, run `lerobot-find-cameras opencv` again before recording. For a permanent setup, use the paths under `/dev/v4l/by-id/` in place of the numbers.

## Teleoperate with live camera view

This needs a desktop session on the Spark, because the Rerun viewer opens a window.

Replace the two `index_or_path` values with your IDs:

```bash
lerobot-teleoperate \
    --robot.type=so101_follower \
    --robot.port=$FOLLOWER_PORT \
    --robot.id=$FOLLOWER_ID \
    --robot.cameras="{ wrist: {type: opencv, index_or_path: 0, width: 640, height: 480, fps: 30}, top: {type: opencv, index_or_path: 2, width: 640, height: 480, fps: 30}}" \
    --teleop.type=so101_leader \
    --teleop.port=$LEADER_PORT \
    --teleop.id=$LEADER_ID \
    --display_data=true
```

The viewer shows both camera images and the six joint values while you move the leader.

If the command stops with a camera error, the camera probably does not support the requested resolution or frame rate. Use the values that `lerobot-find-cameras` listed for it.

## Placement rules that decide training quality

- **Light the scene evenly.** Avoid direct sunlight, reflections and moving shadows.
- **Fix the cameras rigidly.** Do not move them between recording sessions or between recording and running the policy.
- **Frame the task.** Object, gripper and target must be visible in at least one camera. Test: could you do the task by looking only at the camera images?
- **Keep the resolution modest.** 640×480 at 30 frames per second is enough for most tasks and keeps recording and training fast.

## Checklist

- [ ] Both cameras listed by `lerobot-find-cameras opencv`
- [ ] Test images identify which ID is `wrist` and which is `top`
- [ ] Live view shows both images during teleoperation
- [ ] Cameras fixed in their final position
