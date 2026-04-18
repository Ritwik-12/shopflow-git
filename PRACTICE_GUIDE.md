# 🎓 ShopFlow Git Practice Guide
# ══════════════════════════════════════════════════════════════
# You are Raj Sharma, backend dev at ShopFlow Inc.
# This repo is pre-loaded with realistic history across 5 branches.
# Work through each exercise IN ORDER for maximum learning.
# ══════════════════════════════════════════════════════════════

## 📍 Repo Map
# Branches:
#   main                          ← production (tagged v3.1.0)
#   develop                       ← integration (Priya's search feature merged)
#   feature/SHOP-101-login-api    ← YOUR feature (messy WIP commits)
#   hotfix/SHOP-98-payment-null-crash ← emergency fix ready to merge
#   release/v3.2.0                ← upcoming release

## ════════════════════════════════════════════════════════
## EXERCISE 1 — Explore the Repo
## ════════════════════════════════════════════════════════
# Goal: Understand what's in the repo before touching anything.

git log --oneline --graph --all        # See the full branch picture
git branch -a                          # List all branches
git show v3.1.0                        # Inspect the production tag
git log --oneline main                 # What's in production?

## ════════════════════════════════════════════════════════
## EXERCISE 2 — Investigate the Payment Bug
## ════════════════════════════════════════════════════════
# Goal: Find EXACTLY which commit introduced the cart null bug.

git checkout main
git log --oneline                      # Find the payment commit hash
git show <payment-commit-hash>         # Read what was added
git blame src/routes/payment.js        # See who wrote each line

# Then look at the hotfix:
git diff main hotfix/SHOP-98-payment-null-crash

## ════════════════════════════════════════════════════════
## EXERCISE 3 — Apply the Hotfix with Cherry-Pick
## ════════════════════════════════════════════════════════
# Goal: Port the hotfix commit to develop without merging everything.

git checkout develop
git log --oneline hotfix/SHOP-98-payment-null-crash  # Get the fix commit hash
git cherry-pick <hotfix-commit-hash>
git log --oneline                      # Confirm it's now on develop too

## ════════════════════════════════════════════════════════
## EXERCISE 4 — Practice Stash
## ════════════════════════════════════════════════════════
# Goal: Simulate being interrupted mid-work.

git checkout feature/SHOP-101-login-api

# Simulate doing some work
echo "// work in progress" >> src/routes/auth.js
git status                             # See unstaged changes

git stash push -m "WIP: SHOP-101 login in progress"
git status                             # Working tree is clean now

git checkout main                      # Switch freely — no conflicts!
git stash list                         # See your saved work

git checkout feature/SHOP-101-login-api
git stash pop                          # Get your work back
git status                             # Changes restored

git restore src/routes/auth.js         # Clean up

## ════════════════════════════════════════════════════════
## EXERCISE 5 — Clean Up Messy Commits with Interactive Rebase
## ════════════════════════════════════════════════════════
# Goal: Squash the 3 messy WIP commits into 1 clean commit.

git checkout feature/SHOP-101-login-api
git log --oneline                      # See the mess: WIP, "fix typo oops", etc.

git rebase -i HEAD~3
# In the editor that opens:
#   pick  6d8f954  WIP: login route skeleton
#   squash 0758b32  add jwt middleware maybe
#   squash 668974f  fix typo oops
#
# Change "pick" to "squash" on lines 2 and 3.
# Save → write new commit message:
#   feat(auth): add login route with JWT middleware — SHOP-101

git log --oneline                      # See clean single commit now!

## ════════════════════════════════════════════════════════
## EXERCISE 6 — Simulate a Conflict and Resolve It
## ════════════════════════════════════════════════════════
# Goal: Experience and resolve a real merge conflict.

git checkout develop

# Create a conflict — edit the same line a teammate "already changed"
sed -i 's/Internal Server Error/Server Error Occurred/' src/middleware/errorHandler.js
git add src/middleware/errorHandler.js
git commit -m "fix(error): update error response message"

git checkout feature/SHOP-101-login-api

# You also edited the same file differently
sed -i 's/Internal Server Error/Unexpected Server Error/' src/middleware/errorHandler.js
git add src/middleware/errorHandler.js
git commit -m "fix(error): improve error message wording"

# Now rebase onto develop — CONFLICT will occur
git rebase develop

# Open src/middleware/errorHandler.js
# You'll see:  <<<<<<< HEAD ... ======= ... >>>>>>> your commit
# Edit manually to keep the right version, then:
git add src/middleware/errorHandler.js
git rebase --continue

git log --oneline                      # Clean linear history

## ════════════════════════════════════════════════════════
## EXERCISE 7 — Undo Things Safely
## ════════════════════════════════════════════════════════
# Goal: Practice all the undo commands without fear.

# 7a. Amend last commit message
git checkout feature/SHOP-101-login-api
git commit --amend -m "feat(auth): add login endpoint with JWT — SHOP-101"

# 7b. Undo last commit but KEEP the code
git reset --soft HEAD~1
git status                             # Code is staged, commit is gone
git commit -m "feat(auth): add login endpoint with JWT — SHOP-101"  # Redo it

# 7c. Safe revert (creates a new "undo" commit — safe for shared branches)
git checkout main
git log --oneline                      # Find a commit hash to revert
git revert HEAD --no-edit             # Revert the latest commit
git log --oneline                      # New revert commit is added
git revert HEAD --no-edit             # Revert the revert (restore it)

## ════════════════════════════════════════════════════════
## EXERCISE 8 — Recover "Lost" Work with Reflog
## ════════════════════════════════════════════════════════
# Goal: Simulate losing work and recovering it.

git checkout feature/SHOP-101-login-api
echo "// critical feature code" >> src/routes/auth.js
git add src/routes/auth.js
git commit -m "feat: critical work I cannot lose"

# Oops — hard reset "deleted" the commit
git reset --hard HEAD~1
git log --oneline                      # Commit is gone!

# RESCUE with reflog
git reflog                             # Find the lost commit hash
git checkout <lost-commit-hash>        # Go to it
git checkout -b recovery-branch       # Save it as a branch
git log --oneline recovery-branch     # Your work is back!

git branch -D recovery-branch         # Cleanup

## ════════════════════════════════════════════════════════
## EXERCISE 9 — Find a Bug with Bisect
## ════════════════════════════════════════════════════════
# Goal: Use binary search to find which commit broke something.

git checkout main

git bisect start
git bisect bad                         # Current HEAD is "broken"
git bisect good a1cf670                # First commit was "good"

# Git checks out a middle commit. Test it, then:
git bisect good                        # or: git bisect bad
# Repeat until Git says "first bad commit is..."

git bisect reset                       # Exit bisect mode

## ════════════════════════════════════════════════════════
## EXERCISE 10 — Tag a New Release
## ════════════════════════════════════════════════════════
# Goal: Tag the current state as a release.

git checkout main
git tag -a v3.2.0 -m "Release v3.2.0 — login API, payment fix"
git tag                                # See both v3.1.0 and v3.2.0
git show v3.2.0                        # Inspect the tag

# Diff between releases:
git diff v3.1.0 v3.2.0

## ════════════════════════════════════════════════════════
## 🏆 BONUS CHALLENGES
## ════════════════════════════════════════════════════════

# BONUS A: Create your own feature branch from develop,
#           make 3 commits, then squash them before "PR"

# BONUS B: Deliberately create a conflict between two branches
#           and resolve it using rebase

# BONUS C: Use `git log --author="Raj" --since="today"` 
#           to see only your commits

# BONUS D: Run `git shortlog -sn` to see contributions summary

# BONUS E: Export the current state as a zip:
#           git archive --format=zip HEAD > shopflow-v3.zip

