exports.level = {
  "goalTreeString": "%7B%22branches%22%3A%7B%22master%22%3A%7B%22target%22%3A%22C3%27%22%2C%22id%22%3A%22master%22%2C%22remoteTrackingBranchID%22%3A%22o/master%22%2C%22localBranchesThatTrackThis%22%3Anull%7D%2C%22o/master%22%3A%7B%22target%22%3A%22C3%27%22%2C%22id%22%3A%22o/master%22%2C%22remoteTrackingBranchID%22%3Anull%2C%22localBranchesThatTrackThis%22%3A%5B%22master%22%5D%7D%7D%2C%22commits%22%3A%7B%22C0%22%3A%7B%22parents%22%3A%5B%5D%2C%22id%22%3A%22C0%22%2C%22rootCommit%22%3Atrue%7D%2C%22C1%22%3A%7B%22parents%22%3A%5B%22C0%22%5D%2C%22id%22%3A%22C1%22%7D%2C%22C3%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C3%22%7D%2C%22C2%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C2%22%7D%2C%22C3%27%22%3A%7B%22parents%22%3A%5B%22C2%22%5D%2C%22id%22%3A%22C3%27%22%7D%7D%2C%22HEAD%22%3A%7B%22target%22%3A%22master%22%2C%22id%22%3A%22HEAD%22%7D%2C%22originTree%22%3A%7B%22branches%22%3A%7B%22master%22%3A%7B%22target%22%3A%22C3%27%22%2C%22id%22%3A%22master%22%2C%22remoteTrackingBranchID%22%3Anull%2C%22localBranchesThatTrackThis%22%3Anull%7D%7D%2C%22commits%22%3A%7B%22C0%22%3A%7B%22parents%22%3A%5B%5D%2C%22id%22%3A%22C0%22%2C%22rootCommit%22%3Atrue%7D%2C%22C1%22%3A%7B%22parents%22%3A%5B%22C0%22%5D%2C%22id%22%3A%22C1%22%7D%2C%22C2%22%3A%7B%22parents%22%3A%5B%22C1%22%5D%2C%22id%22%3A%22C2%22%7D%2C%22C3%27%22%3A%7B%22parents%22%3A%5B%22C2%22%5D%2C%22id%22%3A%22C3%27%22%7D%7D%2C%22HEAD%22%3A%7B%22target%22%3A%22master%22%2C%22id%22%3A%22HEAD%22%7D%7D%7D",
  "solutionCommand": "git clone;git fakeTeamwork;git commit;git pull --rebase;git push",
  "startTree": "{\"branches\":{\"master\":{\"target\":\"C1\",\"id\":\"master\",\"remoteTrackingBranchID\":null,\"localBranchesThatTrackThis\":null}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"}},\"HEAD\":{\"target\":\"master\",\"id\":\"HEAD\"}}",
  "name": {
    "en_US": "Diverged History",
    "de_DE": "Abweichende History"
  },
  "hint": {
    "en_US": "check out the ordering from the goal visualization",
    "de_DE": "Beachte die Reihenfolge in der Zieldarstellung"
  },
  "startDialog": {
    "en_US": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Diverged Work",
              "",
              "So far we've seen how to `pull` down commits from others and how to `push` up our own changes. It seems pretty simple, so how can people get so confused?",
              "",
              "The difficulty comes in when the history of the repository *diverges*. Before discussing the details of this, let's see an example...",
              ""
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Imagine you clone a repository on Monday and start dabbling on a side feature. By Friday you are ready to publish your feature -- but oh no! Your coworkers have written a bunch of code during the week that's made your feature out of date (and obsolete). They've also published these commits to the shared remote repository, so now *your* work is based on an *old* version of the project that's no longer relevant.",
              "",
              "In this case, the command `git push` is ambiguous. If you run `git push`, should git change the remote repository back to what it was on Monday? Should it try to add your code in while not removing the new code? Or should it totally ignore your changes since they are totally out of date?",
              "",
              "Because there is so much ambiguity in this situation (where history has diverged), git doesn't allow you to `push` your changes. It actually forces you to incorporate the latest state of the remote before being able to share your work."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "So much talking! Let's see this situation in action"
            ],
            "afterMarkdowns": [
              "See? Nothing happened because the command fails. `git push` fails because your most recent commit `C3` is based off of the remote at `C1`. The remote has since been updated to `C2` though, so git rejects your push"
            ],
            "command": "git push",
            "beforeCommand": "git clone; git fakeTeamwork; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "How do you resolve this situation? It's easy, all you need to do is base your work off of the most recent version of the remote branch.",
              "",
              "There are a few ways to do this, but the most straightforward is to move your work via rebasing. Let's go ahead and see what that looks like"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Now if we rebase before pushing instead..."
            ],
            "afterMarkdowns": [
              "Boom! We updated our local representation of the remote with `git fetch`, rebased our work to reflect the new changes in the remote, and then pushed them with `git push`"
            ],
            "command": "git fetch; git rebase o/master; git push",
            "beforeCommand": "git clone; git fakeTeamwork; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Are there other ways to update my work when the remote repository has been updated? Of course! Let's check out the same thing but with `merge` instead.",
              "",
              "Although `git merge` doesn't move your work (and instead just creates a merge commit), it's a way to tell git that you have incorporated all the changes from the remote. This is because the remote branch is now an *ancestor* of your own branch, meaning your commit reflects all commits in the remote branch.",
              "",
              "Lets see this demonstrated..."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Now if we merge instead of rebasing..."
            ],
            "afterMarkdowns": [
              "Boom! We updated our local representation of the remote with `git fetch`, *merged* the new work into our work (to reflect the new changes in the remote), and then pushed them with `git push`"
            ],
            "command": "git fetch; git merge o/master; git push",
            "beforeCommand": "git clone; git fakeTeamwork; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Awesome! Is there any way I can do this without typing so many commands?",
              "",
              "Of course -- you already know `git pull` is just shorthand for a fetch and a merge. Conveniently enough, `git pull --rebase` is shorthand for a fetch and a rebase!",
              "",
              "Let's see these shorthand commands at work"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "First with `--rebase`..."
            ],
            "afterMarkdowns": [
              "Same as before! Just a lot shorter"
            ],
            "command": "git pull --rebase; git push",
            "beforeCommand": "git clone; git fakeTeamwork; git commit"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "And now with regular `pull`"
            ],
            "afterMarkdowns": [
              "Again, exact same as before!"
            ],
            "command": "git pull; git push",
            "beforeCommand": "git clone; git fakeTeamwork; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "This workflow of fetching, rebase/merging, and pushing is quite common. In future lessons we will examine more complicated versions of these workflows, but for now let's try this out.",
              "",
              "In order to solve this level, take the following steps:",
              "",
              "* Clone your repo",
              "* Fake some teamwork (1 commit)",
              "* Commit some work yourself (1 commit)",
              "* Publish your work via *rebasing*"
            ]
          }
        }
      ]
    },
    "de_DE": {
      "childViews": [
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "## Abweichende Inhalte",
              "",
              "Bisher haben wir gesehen wie man per `pull` Commits von Anderen ins lokale Repository holt und die eigenen Änderungen in ein entferntes `push`t. Ist doch ziemlich einfach, wie kann man da durcheinander kommen?",
              "",
              "Die Schwierigkeiten entstehen, wenn die Historys der beiden Repositorys *divergieren*, also voneinander abweichen. Bevor wir die Einzelheiten besprechen, schauen wir uns ein Beispiel an ...",
              ""
            ]
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Stell dir vor du holst dir Montags ein Repository per `clone` und fängst an, an einem Feature zu arbeiten. Bis Freitag soll es fertig und veröffentlicht sein -- doch, oh je! Deine Kollegen haben eine Menge Code während der Woche geschrieben, der dein Feature hat veralten lassen (und überflüssig gemacht hat). Sie haben diesen Code außerdem zum entfernten Repository gepusht, und dadurch basiert *deine* harte Arbeit jetzt auf einer *alten* Version des Projektes, die nicht länger relevant ist.",
              "",
              "In diesem Fall ist ein `git push` problematisch. Wenn du es ausführst, soll Git das entfernte Repository in den Zustand von Montag zurückversetzen? Soll es versuchen deinen Code auf die aktuelle Version zu packen? Oder soll es deine Änderungen einfach ignorieren, weil sie total veraltet sind?",
              "",
              "Da es in dieser Situation so viele Mehrdeutigkeiten gibt (da die Historys divergent sind) erlaubt Git dir nicht, deine Änderungen einfach zu `push`en. Es zwingt dich, zuerst die neuesten Änderungen vom Server zu holen und in deine zu integrieren bevor du deine Arbeit mit anderen teilen kannst."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Bla bla bla. Schauen wir uns das lieber in Aktion an:"
            ],
            "afterMarkdowns": [
              "Siehst du? Nichts passiert, weil der Befehl fehlschlägt. `git push` schlägt fehl, weil der neueste Commit `C3` auf dem Commit `C1` des Remotes basiert. Der entfernte Server hat mittlerweile jedoch `C2` gepusht bekommen, also lässt Git deinen Push jetzt nicht mehr zu."
            ],
            "command": "git push",
            "beforeCommand": "git clone; git fakeTeamwork; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Wie sollen wir das auflösen? Es ist ganz einfach, du musst deinen Commit nur von der aktuellsten Version des Remotes ableiten.",
              "",
              "Es gibt verschiedene Möglichkeiten wie man das erreichen kann, aber die offensichtlichste ist es, deine Commits per Rebase zu verschieben. Schauen wir mal wie das abläuft:"
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Also wenn wir vor dem Push erst mal einen Rebase mache ..."
            ],
            "afterMarkdowns": [
              "Bämm! Wir haben unsere lokale Abbildung des entfernten Repositorys mit `git fetch` auf den neuesten Stand gebracht, unsere Arbeit auf die neueste Version des Remotes drauf gepackt und dann mit `git push` auf den Server geschoben."
            ],
            "command": "git fetch; git rebase o/master; git push",
            "beforeCommand": "git clone; git fakeTeamwork; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Gibt es noch weitere Möglichkeiten deine Arbeit zu aktualisieren wenn das entfernte Repository neue Commits bekommen hat? Klar! Schauen wir uns dasselbe an, aber diesmal arbeiten wir mit `merge`.",
              "",
              "Obwohl `git merge` deine Arbeit nicht verschiebt (und stattdessen einen Merge Commit erzeugt) ist es eine Möglichkeit Git dazu zu bringen, alle Änderungen vom Remote in deine Sachen zu integrieren. Denn durch den Merge wird der Remote Branch zu einem *Vorgänger* deines Branches, was bedeutet dass dein Commit alle Commits des entfernten Branches beinhaltet.",
              "",
              "Zur Demonstration ..."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Wenn wir nun also mergen anstatt einen Rebase zu machen ..."
            ],
            "afterMarkdowns": [
              "Ok. Wir haben die lokale Abbildung des entfernen Repositorys mit `git fetch` aktualisiert, die neuen Änderungen per *Merge* in deine integriert, und letztere dann mit `git push` auf den Server gebracht."
            ],
            "command": "git fetch; git merge o/master; git push",
            "beforeCommand": "git clone; git fakeTeamwork; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Wahnsinn! Kann ich das auch irgendwie machen ohne soviel zu tippen?",
              "",
              "Na klar -- du kennst ja schon `git pull` als Zusammenfassung von `fetch` und `merge`. Praktischerweise bringt man es mit der Option `--rebase` dazu, anstatt des Merge einen Rebase zu machen.",
              "",
              "Gucken wir uns das mal an."
            ]
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Zunächst `git pull --rebase` ..."
            ],
            "afterMarkdowns": [
              "Genau wie vorher! Nur viel kürzer."
            ],
            "command": "git pull --rebase; git push",
            "beforeCommand": "git clone; git fakeTeamwork; git commit"
          }
        },
        {
          "type": "GitDemonstrationView",
          "options": {
            "beforeMarkdowns": [
              "Und nun das normale `git pull` ..."
            ],
            "afterMarkdowns": [
              "Und wieder, genau wie zuvor!"
            ],
            "command": "git pull; git push",
            "beforeCommand": "git clone; git fakeTeamwork; git commit"
          }
        },
        {
          "type": "ModalAlert",
          "options": {
            "markdowns": [
              "Dieser Ablauf von `fetch`, `rebase` / `merge` und `push` ist sehr verbreitet. In zukünftigen Leveln werden wir uns kompliziertere Varianten dieses Workflows ansehen, aber jetzt probieren wir erst mal diesen aus.",
              "",
              "Um diesen Level zu lösen, gehe folgende Schritte durch:",
              "",
              "* Clone dein Repository",
              "* Simuliere einen entfernten Commit mit `git fakeTeamwork`",
              "* Erzeuge einen lokalen Commit",
              "* Benutze *Rebase*, um deine Arbeit schließlich pushen zu können"
            ]
          }
        }
      ]
    }
  }
};
