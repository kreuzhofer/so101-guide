# 5. Assemble the arms

Build both arms from the base upwards. The steps are the same for leader and follower up to the wrist; only the last step differs.

Unplug USB and power while you assemble. Each step links to the official assembly video, which shows the orientation of every part.

## General rules

- **Use the labelled servo for each joint.** Joint 1 gets servo 1, and so on. On the leader this also decides the gear ratio.
- **Keep one cable in every servo** before it goes into the arm. Some sockets are hard to reach afterwards.
- **Two screw sizes.** M2x6 screws (the smallest) hold servos in the printed parts. M3x6 screws hold horns and connect the printed parts to the horns.
- **Do not force joints by hand more than needed.** Turning a geared servo by hand is fine, but go slowly, especially on the follower.
- **Tighten firmly, not hard.** The screws go into plastic.

## Joint 1: base and shoulder pan

- Install both motor horns on servo 1. Secure the top horn with an M3x6 screw. The bottom horn needs no screw.
- Place servo 1 into the base.
- Fasten it with four M2x6 screws, two from the top and two from the bottom.
- Slide the first motor holder over it and fasten it with two M2x6 screws, one on each side.
- Attach the shoulder part.
- Tighten the shoulder part with four M3x6 screws on top and four on the bottom.
- Add the shoulder motor holder.

[Watch: Joint 1](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/lerobot/Joint1_v2.mp4)

## Joint 2: shoulder lift

- Install both motor horns on servo 2. Secure the top horn with an M3x6 screw.
- Slide servo 2 in from the top.
- Fasten it with four M2x6 screws.
- Attach the upper arm with four M3x6 screws on each side.

[Watch: Joint 2](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/lerobot/Joint2_v2.mp4)

## Joint 3: elbow

- Install both motor horns on servo 3. Secure the top horn with an M3x6 screw.
- Insert servo 3 and fasten it with four M2x6 screws.
- Connect the forearm to servo 3 with four M3x6 screws on each side.

[Watch: Joint 3](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/lerobot/Joint3_v2.mp4)

## Joint 4: wrist flex

- Install both motor horns on servo 4. Secure the top horn with an M3x6 screw.
- Slide motor holder 4 over the forearm.
- Slide in servo 4.
- Fasten it with four M2x6 screws.

[Watch: Joint 4](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/lerobot/Joint4_v2.mp4)

## Joint 5: wrist roll

- Insert servo 5 into the wrist holder and secure it with two M2x6 screws from the front.
- Install **one** motor horn on servo 5 and secure it with an M3x6 screw.
- Secure the wrist to servo 4 with four M3x6 screws on both sides.

[Watch: Joint 5](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/lerobot/Joint5_v2.mp4)

## Last step on the follower: gripper

- Attach the gripper to the horn of servo 5 with four M3x6 screws.
- Insert servo 6 and secure it with two M2x6 screws on each side.
- Install both motor horns on servo 6. Secure the top horn with an M3x6 screw.
- Install the moving jaw and secure it with four M3x6 screws on both sides.

[Watch: Gripper](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/lerobot/Gripper_v2.mp4)

## Last step on the leader: handle and trigger

- Mount the leader holder onto the wrist and secure it with four M3x6 screws.
- Attach the handle to the leader holder with one M2x6 screw.
- Insert servo 6, secure it with two M2x6 screws on each side, and attach one motor horn with an M3x6 screw.
- Attach the trigger with four M3x6 screws.

[Watch: Leader handle](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/lerobot/Leader_v2.mp4)

## Wire the chain

Each servo has two identical 3-pin sockets. Connect them in a line:

1. Board to servo 1.
2. Servo 1 to servo 2, servo 2 to servo 3, and so on up to servo 6.
3. Mount the controller board on its plate in the base.

Leave enough slack at every joint so the cable is not pulled tight at either end of the joint's range. Move each joint by hand through its full range and watch the cables.

## Mount the arms

Clamp each base to the table with two clamps. Place the arms so that:

- the follower can reach its full workspace without hitting the leader, the Spark or a wall;
- you can hold the leader comfortably while watching the follower;
- both arms face the same direction, which makes the mirroring intuitive.

## Checklist

- [ ] Both arms assembled, joints move freely by hand over their full range
- [ ] Six servos chained on each arm, cable from servo 1 to the board
- [ ] No cable is stretched or pinched at any joint position
- [ ] Both bases clamped to the table
- [ ] Leader and follower boards still carry the right labels
