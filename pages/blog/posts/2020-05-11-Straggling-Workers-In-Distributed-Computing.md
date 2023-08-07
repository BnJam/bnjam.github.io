---
layout: post
title: Straggling Workers in Distributed Computing
---

The effects and approaches to consider when dealing with straggling workers.

Distributed systems can be utilized in order to improve the computational power of a system. By horizontally scaling the number of compute nodes, the amount of computational power increases. This allows systems to process an immense amount of data/tasks as compared to a single machine. Vertically scaling is typically more expensive, thus the focus on horizontal scaling. With the increase of nodes and compute power, there is also an increase in the issues surrounding distributed systems.

## Clusters

A cluster, in this realm, is a collection of dedicated computational hardware that can communicate; usually over a dedicated private network (but keep in mind distributed systems exist over public networks). Single end-point nodes of this cluster are what we call “workers “— typically governed by a centralized “primary node”, though in decentralized systems this distinction is obscured as the entire network can be a conglomeration of primary/workers. A primary node directs the workers to perform operations on tasks that unify toward a common goal (this holds true regardless of the network being centralized or decentralized) of the system through a scheduling protocol.

Careful consideration towards task allocation can have immediate effects on the efficiency of a system. The type of system is what dictates the best scheduling approach. In a synchronous scheduling of tasks, the network is only as fast as its slowest worker. The same applies to asynchronous architectures, but with a faster rate of overall system completion. The rate of completion also depends on the nature of the task itself. If tasks are not dependent on each other, then the system may progress concurrently. However, is tasks do depend on each other, then the system may experience a varied progress rate where at times it may be zero.

## Straggling Workers

Not all hardware (and software) are equal and as a network or systems developer, assuming this will surely disappoint you in the future. Workers may sometimes be composed of a multitude of different hardware/software combinations — with cloud computing in Azure or AWS; it’s easier to dictate the hardware to compute with but this still does not always account for hardware age or traffic levels. A shared compute node may see increased irregularities in worker efficiency as opposed to a dedicated compute node. In the general case, we assume a worker to be an entity with its own OS which is susceptible to network, process, and memory irregularities that sometimes occur.

When provided with tasks, workers sometimes either become corrupt (maybe by a broken process) or another process has started (out of the control of the user and primary node) that demands more computational power that causes the computation of the task to take longer. Perhaps it is the task itself that is computationally demanding that causes a worker to take longer. In other (probably most) cases, it is the network that bottlenecks task completion communication between the worker and primary.

When one (or more) workers begin to experience these disruptions, they fall behind the other workers in terms of progress over assigned tasks — these are considered straggling workers. The product these straggling workers output may become stale if the application requires operations on current data and therefore useless. If stale data is used there is the possibility that it will hinder the progress made by other workers.

### Persistent Stragglers

It’s fairly intuitive to reason about workers that are persistently straggling — they fell behind and are in a constant state of catch up and are persistently falling behind due to lack of computational power/network bottlenecking compared to other workers. For example, a worker is consistently slower at processing an image than the other workers. Due to their persistent behavior, solutions to overcoming this deficit can be more easily analyzed.

### Non-Persistent Stragglers

These types of straggling workers are harder to predict and analyze solutions for. Non-persistent straggling workers are intermittently straggling but may not always be in as much of a deficit as compared to other workers as they may complete a significant portion of the assigned tasks by the time other workers have completed theirs. For example, an intermittent process keeps locking up resources that the worker is trying to use for the assigned task.

### Overcoming Stragglers

For the moment we will focus on a centralized system as that is the typical architecture when deploying a compute cluster.

The age-old saying every developer has uttered lands true when dealing with straggling workers: “It depends…”. Dealing with stragglers is not as cut and dry as a single solution but dependent on the environment and application they work in.

If the tasks are dependent on one another and a straggling worker is holding up the next step, there’s not much to do without restarting the system with a different set of workers (if that’s possible). Another option is refactoring the tasks such that they are as simple as possible to process. Otherwise any other optimization improvements may help the straggler keep up. Task dependency situations are when the slowest worker will dictate the clock time of your system the most.

If the tasks are independent and can run concurrently without issue, then things are a little easier. When the output data are becoming stale, the worker may be discarded or restarted (depending on the architecture). This would involve replacing any pending tasks back into the pool to be reassigned to available workers.

With non-persistent stragglers, one such method is detailing a specified scheduling scheme to focus on leveraging straggling workers. With tasks that are replaceable, the Cyclic Shift (CS) scheduling scheme could benefit by shifting task ordering by an integer for each worker. Another is the Staircase scheduling scheme that performs inverse computation orders at the workers on the task ordering.

The previous possible solutions are relevant to tasks that are assigned at start and in bulk — typically as a vector of task order. However, there is the option of integrating a request-push task assignment to workers. This would involve the worker requesting a task and the primary pushing one to the worker. This option imposes a heavier tax on network traffic.

Network bottlenecks are a tricky situation to deal with, especially when communicating large amounts of data (say a models parameters through a parameter-sever architecture). Quantification and encoding data offer a promising avenue for compressing data into smaller transferable amounts (quanta).

The possible solutions do not stop here, of course, I will update this page as I research more options.

## Decentralized Architecture

Given the previous information focused mostly on a centralized system, we shift focus to a decentralized architecture. It is possible to have centralized architectures embedded inside a decentralized network where each primary node has a subset of compute nodes. However, it’s the primary nodes we will focus on. Since there is no global or centralized “primary”, task allocation is done a little differently through the use of policies, bidding, and/or reputation. We will gloss over the specifics of task allocation and realize that a decentralized system communicating tasks and requests with one another will also be subject to the same bounding issues as a centralized architecture if one (or more) becomes a straggler.

## Conclusion

Straggling workers are a hindrance to system efficiency. With all the scenarios that could cause a straggler to occur, there are ways to mitigate and handle such situations. It may not solve the problem entirely when things are out of our control, but we can make the best out of it with proper approaches and tools.

## References

[1] Mohammad Mohammadi Amiri and Deniz Gunduz. Computation scheduling for distributed machine learning withstraggling workers.IEEE Transactions on Signal Processing, 67(24):6270–6284, Dec 2019.

[2] Emre Ozfatura, Deniz Gunduz, and Sennur Ulukus. Speeding up distributed gradient descent by utilizing non-persistent stragglers.2019 IEEE International Symposium on Information Theory (ISIT), Jul 2019.

[3] Jingjing Zhang and Osvaldo Simeone. Lagc: Lazily aggregated gradient coding for straggler-tolerant andcommunication-efficient distributed learning.IEEE Transactions on Neural Networks and Learning Systems,page 1–13, 2020.

[4] Antonio Polino, Razvan Pascanu, and Dan Alistarh. Model compression via distillation and quantization, 2018

[5] Seunghak Lee, Jin Kyu Kim, Xun Zheng, Qirong Ho, Garth A Gibson, and Eric P Xing. On model parallelization andscheduling strategies for distributed machine learning. In Z. Ghahramani, M. Welling, C. Cortes, N. D. Lawrence,and K. Q. Weinberger, editors,Advances in Neural Information Processing Systems 27, pages 2834–2842. CurranAssociates, Inc., 2014.

