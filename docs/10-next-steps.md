# 10. Next steps

The follow-me demo is the foundation for everything that involves AI: a policy learns from recordings of exactly this teleoperation. This chapter outlines the path from here. It is a map, not a tested walkthrough.

## The loop you will repeat

1. **Record** 30 to 50 demonstrations of one task with leader, follower and cameras.
2. **Train** a policy on the recordings.
3. **Run** the policy on the follower and watch where it fails.
4. Record more demonstrations of the failure cases and train again.

## Add the training tools

```bash
source ~/so101/env.sh
uv pip install 'lerobot[core_scripts,feetech,training]==0.7.0'
```

Larger pretrained models need their own extras, for example `lerobot[smolvla]` or `lerobot[pi]`.

## Connect to the Hugging Face Hub

Datasets and trained policies are stored on the Hub, which also makes them available to other machines. Private repositories work.

```bash
hf auth login
HF_USER=$(NO_COLOR=1 hf auth whoami | awk -F': *' 'NR==1 {print $2}')
echo $HF_USER
```

## Record a first dataset

A minimal recording of five episodes with the two cameras from chapter 8:

```bash
lerobot-record \
    --robot.type=so101_follower \
    --robot.port=$FOLLOWER_PORT \
    --robot.id=$FOLLOWER_ID \
    --robot.cameras="{ wrist: {type: opencv, index_or_path: 0, width: 640, height: 480, fps: 30}, top: {type: opencv, index_or_path: 2, width: 640, height: 480, fps: 30}}" \
    --teleop.type=so101_leader \
    --teleop.port=$LEADER_PORT \
    --teleop.id=$LEADER_ID \
    --display_data=true \
    --dataset.repo_id=${HF_USER}/so101-first-test \
    --dataset.num_episodes=5 \
    --dataset.single_task="Pick up the cube and place it in the bowl" \
    --dataset.streaming_encoding=true \
    --dataset.encoder_threads=2
```

The official tutorial explains the keyboard controls and episode timing: [Imitation learning on real robots](https://huggingface.co/docs/lerobot/il_robots).

## Train a first policy on the Spark

Start with ACT. It is small, trains from scratch and is the standard first policy for this arm.

```bash
lerobot-train \
    --dataset.repo_id=${HF_USER}/so101-first-test \
    --policy.type=act \
    --policy.device=cuda \
    --policy.repo_id=${HF_USER}/act-so101-first-test \
    --output_dir=outputs/train/act_so101_first_test \
    --job_name=act_so101_first_test \
    --steps=20000
```

## What fits where

Memory figures are from the LeRobot hardware guide, for batch size 8.

| Policy group | Examples | Memory | Spark | Slurm cluster (B300) |
| --- | --- | --- | --- | --- |
| Light | `act` | 2–6 GB | Good fit | Not needed |
| Diffusion | `diffusion` | 8–14 GB | Fits | Faster |
| Small VLA | `smolvla` | 10–16 GB | Fits, overnight runs | Recommended |
| Large VLA | `pi0`, `pi05`, `groot` | 24–40 GB | Fits in memory, very slow | Recommended |

### Reported training times on a DGX Spark

These are community reports for SO-101 tasks. They were found through web search and not verified.

| Policy | Run | Reported time |
| --- | --- | --- |
| ACT | 100,000 steps, batch 8 | about 7 h |
| SmolVLA | 20,000 steps | about 30 h |
| GR00T N1.6 | 10,000 steps | about 5.5 h |

The default step counts are generous. The LeRobot hardware guide says imitation learning typically converges within 5 to 10 passes over the data, so small datasets need far fewer steps.

## Hand larger runs to the Slurm cluster

The data flow stays the same; only the training command moves.

1. Record on the Spark and push the dataset to the Hub.
2. On the cluster, install the same LeRobot version and run the same `lerobot-train` command inside an `sbatch` script.
3. The job pushes the trained policy to the Hub.
4. The Spark pulls the policy and runs it on the follower.

Points to clarify before the first cluster run:

- Do the compute nodes have outbound internet, or must datasets and base models be copied over?
- The B300 nodes need LeRobot 0.7 with its PyTorch 2.15 build; older builds lack support for this GPU.
- For several GPUs, launch with `torchrun --nproc-per-node=N $(which lerobot-train) …`. Each GPU loads its own batch, so the effective batch size multiplies.

## Further reading

- [Imitation learning on real robots](https://huggingface.co/docs/lerobot/il_robots): recording, training and running a policy, step by step.
- [Compute hardware guide](https://huggingface.co/docs/lerobot/hardware_guide): memory and time per policy.
- [Multi-GPU training](https://huggingface.co/docs/lerobot/multi_gpu_training).
- [SmolVLA](https://huggingface.co/docs/lerobot/smolvla) and [ACT](https://huggingface.co/docs/lerobot/act) policy pages.
