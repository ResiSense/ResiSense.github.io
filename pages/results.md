This page presents critical experimental data from our wet lab activities throughout the project. For more details on the experiment design rationale, please see [Proof of Concept](/proof-of-concept). For further experimental data, including the troubleshooting processes, please see [Engineering Success](/engineering). Protocols that we used to conduct our experiments in this page are available in our [Notebook](/notebook).  

# Cell Lysis: SDS Treatment
> See protocol [[P25]](/notebook#p25)  

<blockquote id="figure-1">

![Figure 1: Microscopy images of *E. coli* cells before and after treating with SDS](/assets/results-images/p25.png)  

Figure 1: *Microscopy images of E. coli cells before and after treating with SDS*  

</blockquote>

As described in our [Proof of Concept](/proof-of-concept#cell-lysis), we selected **SDS** to lyse our cells. *[Figure 1](#figure-1)* shows the results of our SDS treatment of *Escherichia coli (E. coli)* in the form of microscopy pictures. We selected an area in both photographs and magnified the selected area for comparison. We can observe **more intact cells in the left image**, marked in red circles, compared to the picture on the right. This indicates that the **lysis of *E. coli* using SDS at room temperature was successful**. More robust luciferase-based tests are planned to verify this method further quantitatively.  

# Target Gene Extraction: Nt.BsmAI/HhaI-LSDA
> See protocol [[P26]](/notebook#p26)

<blockquote id="figure-2">

![Figure 2: Gel electrophoresis of Nt.BsmAI/HhaI-LSDA](/assets/results-images/p26.png)  

Figure 2: *Gel electrophoresis of Nt.BsmAI/HhaI-LSDA*  

</blockquote>

In this project, we **extract our primer**, which will be used in downstream reactions through **LSDA**. This process involves the **nicking and cutting of pSB1C3-KPC-2-surrogate by Nt.BsmAI and HhaI**. As illustrated in our [Proof of Concept](/proof-of-concept#target-gene-extraction), this process is expected to **amplify a 32nt ssDNA** from the pSB1C3-KPC-2-surrogate plasmid, along with **724 and 534nt ssDNA** strands as the side products of this LSDA process. *[Figure 2](#figure-2)* shows that our LSDA reaction has successfully generated the 724 and 534nt ssDNA. However, we **cannot detect the 32nt primer**, potentially due to its smaller size. To validate this method further, we will combine this reaction with RCA to determine if it can produce a positive RCA result.  

Note that in this preliminary experiment, we performed **45 minutes of digestion**, followed by **incubating with Φ29 for an extra 15 minutes** to **prevent the displaced ssDNA from Φ29 exonuclease activity**. However, this two-step reaction is unnecessary in the target gene extraction-RCA coupling since the extracted primer will immediately bind to the RCA template.  

# Rolling Circle Amplification

## RCA in rCutSmart
> See protocols [[P27]](/notebook#p27) and [[P28]](/notebook#p28)

<blockquote id="figure-3">

![Figure 3: Gel electrophoresis of RCA in rCutSmart](/assets/results-images/p27-p28.png)  

Figure 3: *Gel electrophoresis of RCA in rCutSmart*  

</blockquote>

The reaction mixture **must be compatible with both reactions** to facilitate the **coupling of the target gene extraction and the RCA process**. Therefore, we tested whether Φ29 is compatible with the rCutSmart buffer, which is the **primary buffer for Nt.BsmAI and HhaI**. *[Figure 3](#figure-3)* demonstrates that **the RCA process can be entirely performed in the rCutSmart buffer**. This is indicated by the presence of **smearing bands**, with a size larger than the 10,000bp DNA ladder, in **both the "10× Reaction Buffer" and "rCutSmart Buffer" lanes**. The smearing bands are expected due to the **continuous amplification by RCA** and the **generation of variable-length amplification products**. The result of experiment [E2.3](/engineering#e2-3-first-generation-rca-in-rcutsmart-buffer-without-dtt) also obtains further verification.  

## Third-Generation RCA
> See protocols [[P22]](/notebook#p22) and [[P23]](/notebook#p23)

<blockquote id="figure-4">

![Figure 4: Gel electrophoresis of third-generation RCA](/assets/results-images/p22-p23.png)  

Figure 4: *Gel electrophoresis of third-generation RCA*  

</blockquote>

We have also verified both our RCA template circularisation and our RCA methods. With our **third-generation RCA template (BBa_K5041004)**, we can obtain satisfactory results for our RCA.  

In *[Figure 4](#figure-4)*, lanes 1-4 included both the **third-generation (v3) template (treated with Exonuclease I and III)** and the **RCA primer** (Integrated DNA Technologies), mixed with the **Nt.BsmAI nicking endonuclease** (New England Biolabs). The template amounts were 1ng, 2ng, 4ng, and 8ng, respectively. Lane 5 contained the same template and RCA primer **without Nt.BsmAI**, while lane 6 had only the third-generation template (treated with Exonuclease I and III), with neither the primer nor Nt.BsmAI.  

Lanes 1-4 displayed a **smearing band** throughout, indicating successful RCA and effective cutting by Nt.BsmAI, with band intensity increasing alongside the template amounts. Lane 5 showed a smearing band concentrated at sizes larger than 10,000bp, suggesting successful RCA in that sample. In contrast, lane 6 had no detected band, confirming that we obtained **true negative results** from this circularisation method.  

# Signal Expression: G-Quadruplex DNAzyme Assay
> See protocol [[P24]](/notebook#p24)

<blockquote id="figure-5">

![Figure 5: G-quadruplex DNAzyme coupling assay results](/assets/results-images/p24.png)  

Figure 5: *G-quadruplex DNAzyme coupling assay results*  

</blockquote>

To verify our project mechanism, we coupled the RCA results obtained in *[Figure 4](#figure-4)* for the **G-quadruplex assay**. As shown in *[Figure 5](#figure-5)*, both samples 1 and 2 exhibited **a similar slight colour change to blue**, while samples 3 and 4 had a **more robust colour change**. Sample 5 exhibited slightly weaker colour change compared to sample 1, while sample 6 **did not produce an observable blue colour**. The last shown sample was a **positive control reaction mixture** using IDT-synthesised G-quadruplex DNAzyme ([BBa_K5041001](https://parts.igem.org/Part:BBa_K5041001)) [[1]](#reference-1), which resulted in a stronger colour change compared to all of the RCA-generated G-quadruplex DNAzyme. These results indicate that we have successfully coupled our third-generation RCA reaction with the G-quadruplex assay.  

<blockquote id="figure-6">

![Figure 6: Quantification of RCA-generated G-quadruplex DNAzymes Activity](/assets/results-images/p29.png)

Figure 6: *Quantification of RCA-generated G-quadruplex DNAzymes Activity*  

</blockquote>

The activity of the RCA-generated G-quadruplex was then quantified by measuring the **absorbance at 650nm** for 90 seconds. Consistent with the result shown in *[Figure 5](#figure-5)*, samples cut with **Nt.BsmAI** during the RCA process exhibited **higher activity** compared to those RCA products without Nt.BsmAI. In addition, the quantification results support our claim that the **G-quadruplex DNAzyme activity increases with the increase of template quantity**.  

# Quantification of G-Quadruplex Activity

<blockquote id="figure-7">

![Figure 7: Quantification of [BBa_K5041001](https://parts.igem.org/Part:BBa_K5041001) Activity Against Its Previous Variants](/assets/results-images/p30.png)

Figure 7: *Quantification of [BBa_K5041001](https://parts.igem.org/Part:BBa_K5041001) Activity Against Its Previous Variants*  

</blockquote>

In addition, we also measured the activity of our selected G-quadruplex DNAzyme ([BBa_K5041001](https://parts.igem.org/Part:BBa_K5041001)) [[1]](#reference-1) against its predecessor variants: [BBa_K1614007](https://parts.igem.org/Part:BBa_K1614007) [[2]](#reference-2) , [BBa_K3343000](https://parts.igem.org/Part:BBa_K3343000) [[3]](#reference-3), and [BBa_K3343001](https://parts.igem.org/Part:BBa_K3343001) [[4]](#reference-4). After successfully replicating the optimum signal of [BBa_K3343000](https://parts.igem.org/Part:BBa_K3343000) and [BBa_K3343001](https://parts.igem.org/Part:BBa_K3343001) as presented by van den Brink [[3]](#reference-3) [[4]](#reference-4), we also plotted the activity of [BBa_K5041001](https://parts.igem.org/Part:BBa_K5041001) along with the other variants of G-quadruplex DNAzyme. As shown in *[Figure 7](#figure-7)*, [BBa_K5041001](https://parts.igem.org/Part:BBa_K5041001) exhibited a **higher activity** compared to the other variants, making [BBa_K5041001](https://parts.igem.org/Part:BBa_K5041001) as the **ideal choice** to be utilised in our testing kit.  

# Conclusion

We have individually tested the **cell lysis** and **target gene extraction** and **coupled the RCA reaction with the G-quadruplex DNAzyme assay**. The experimental results support the claim that **the project is feasible** and **the mechanism is valid**. To further support our claim, more experiments are planned to confirm the coupling of all reactions.  

# Additional Key Information

All processes in our detection system are **designed to be completed at room temperature**. While we have confirmed that most reactions **can occur at 37°C or below**, we primarily performed the experiments at the recommended optimal temperature for each enzyme to ease detection and validate the concept. Further optimisation on the individual steps is needed to evaluate the product performance at room temperature. In the future, we are also planning to characterise our detection system on its sensitivity and specificity.  

# References

1. C. K. Leung, "BBa_K5041001 Peroxidase-mimicking DNAzyme", Registry of Standard Biological Parts, https://parts.igem.org/Part:BBa_K5041001 (accessed Oct. 22, 2024).  
2. F. A. Sorgenfrei, "BBa_K1614007 HRP-mimicking DNAzyme", Registry of Standard Biological Parts, https://parts.igem.org/Part:BBa_K1614007 (accessed Oct. 22, 2024).  
3. M. van den Brink, "BBa_K3343000 DNAzyme with peroxidase activity", Registry of Standard Biological Parts, https://parts.igem.org/Part:BBa_K3343000 (accessed Oct. 22, 2024).  
4. M. van den Brink, "BBa_K3343001 DNAzyme with peroxidase activity", Registry of Standard Biological Parts, https://parts.igem.org/Part:BBa_K3343001 (accessed Oct. 22, 2024).  