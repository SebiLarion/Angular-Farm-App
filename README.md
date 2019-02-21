af-alex
AL Alex

---

## run develop server

```
npm start

yarn start
```

## build for production
```
npm run build-prod
```

---
# GIT BASIC Workflow 

### (this DRAFT FLOW uses only master branch)

> we will probably use _master_ and _dev_ branches, so the following commands will use `dev` instead of `master`


- you might use a visual GIT client (use the commands as a guideline)


---
### Clone repo (ONE TIME)

`git clone https://user@bitbucket.org/dancoteam/af-alex.git`


- if you don't want to clone, and just connect you can use:

`git remote add origin https://user@bitbucket.org/dancoteam/af-alex.git`


---
### Check GIT status (ANYTIME)

`git status`

```
On branch master
Your branch is up-to-date with 'origin/master'.
```

---
### Get new data (OFTEN - no risk for your local copy)

`git fetch origin`

- this will only get new data from remote (doesn't merge changes on existing files)


---
### Get new data and merge remote changes into your local files (BEFORE FEATURE DEVELOP)

`git pull origin master`

- you should not have any uncommitted local changes before you pull

- if you have some local changes in your working copy that you can't commit, and you need to start working on other feature, use stash feature

- using stash you'll have a clean working copy before pull

`git stash`

```
Saved working directory...
```

`git status`

```
# On branch master
nothing to commit (working directory clean)
```

- list stashes with `git stash list`


---
### Working Locally - edit, stage, commit (AS OFTEN AS NEEDED FOR LOCAL DEVELOPMENT)

> multiple commit if needed (don't mix different features into the same commit)


- stage files locally

`git add *`

- commit with descriptive message

`git commit -m "developer message"`


---
### Push to central repo (AFTER FEATURE DEVELOP)

`git push origin master`

 



