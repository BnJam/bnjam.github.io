---
layout: post
title: Ship Detection - Parameter Server Variant
---

Deep learning ship detection in satellite optical imagery suffers from false positive occurrences with clouds, landmasses, and man-made objects that interfere with correct classification of ships, typically limiting class accuracy scores to 88%. This work explores the tensions between customization strategies, class accuracy rates, training times, and costs in cloud based solutions. We demonstrate how a custom U-Net can achieve 92% class accuracy over a validation dataset and 68\% over a target dataset with 90\% confidence. We also compare a single node architecture with a parameter server variant whose workers act as a boosting mechanism. The parameter server variant outperforms class accuracy on the target dataset reaching 73\% class accuracy compared to the best single node approach. A comparative investigation on the systematic performance of the single node and parameter server variant architectures is discussed with support from empirical findings.

[ARXIV: Ship Detection: Parameter Server Variant](https://arxiv.org/abs/2012.00953)
<object data="http://www.smithlite.com/pdf/SHIPDET_SYSTEMS.pdf" type="application/pdf" width="700px" height="700px">
    <embed src="http://www.smithlite.com/pdf/SHIPDET_SYSTEMS.pdf">
        <a href="http://www.smithlite.com/pdf/SHIPDET_SYSTEMS.pdf">Download PDF</a>
</object>
