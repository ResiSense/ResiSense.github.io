This page presents the experimental trials and tribulations that we encountered during our project.  

# Outline

## First-Generation RCA

- Issues with circular template construction when treated with Exonuclease I, causing false positive signals
- Failure to cut the individual G-quadruplex structure using DNA-cleaving DNAzymes
- Weak signal expression level

## Second-Generation RCA

- Failure to obtain a positive RCA result, presumably due to failure in template circularisation

## Third-Generation RCA

- Successfully eliminated the false positive signals
- Successfully cut the generated G-quadruplex structures into shorter strands
- Successfully optimised the G-quadruplex DNAzyme signal

# Future Directions

There are still improvements to be made to our system, with the following items being the most promising to test.  
1. Coupling with primer extraction reaction
2. Test 4 ng first-generation vs 4 ng third-generation RCA templates
3. Test 4 ng cut vs uncut third-generation RCA template

# Glossary

| Abbreviation    | Full Name                                                            |
| :-------------- | :------------------------------------------------------------------- |
| DNAzyme         | Deoxyribozyme                                                        |
| RCA             | Rolling Circle Amplification                                         |
| RCA-GQ coupling | Rolling Circle Amplification and G-Quadruplex DNAzyme Assay coupling |
| ssDNA           | single-stranded DNA                                                  |
| dsDNA           | double-stranded DNA                                                  |

# [E1] RCA Template Construction

## [E1.1] First-Generation RCA Template Treated with Exonuclease I
> See protocols [[P01]](/notebook#p01), [[P02]](/notebook#p02), and [[P03]](/notebook#p03)  
> Keyword: FALSE POSITIVE  

### Design
Our first-generation (v1) circular template ([BBa_K5041002](https://parts.igem.org/Part:BBa_K5041002)) is a 49bp long ssDNA with a phosphate group at the 5' end. This first-generation circular template contains the G-quadruplex DNAzyme complementary sequences, the annealing sites for the first-generation RCA scaffold and RCA primer, as well as the cutting sites for two DNA-cleaving DNAzymes. The DNA-cleaving DNAzymes, however, were not used in this experiment (see [E2.1](#e21-dna-cleaving-dnazymes-test) for details).   

### Build
The linear single-stranded first-generation RCA template was circularised using a padlock probe ligation method, which involved the first-generation RCA scaffold ([BBa_K5041003](https://parts.igem.org/Part:BBa_K5041003)) and T4 DNA Ligase (New England Biolabs). Subsequently, the first-generation circular template was treated with Exonuclease I (Thermo Fisher Scientific). All DNA used in this experiment was sourced from Integrated DNA Technologies (IDT).  

### Test

#### RCA Results

<blockquote id="figure-1">

![Figure 1: RCA using ExoI-Treated Template (v1)](/assets/engineering-success-images/ES1.png)  

Figure 1: *RCA using ExoI-Treated Template (v1)*  

</blockquote>

In the gel electrophoresis result (*[Figure 1](#figure-1)*), lane 1 contained both the first-generation template and the IDT-synthesised RCA primer, while lane 2 contained only the first-generation template. Both lanes exhibited similar smeared bands, with a size greater than 10,000bp, which suggests that successful RCA occurred in both samples. This result indicates a false positive result was generated in our RCA process.  

#### RCA-GQ Coupling Results

<blockquote id="figure-2">

![Figure 2: RCA(v1)-GQ Coupling](/assets/engineering-success-images/ES2.png)  

Figure 2: *RCA(v1)-GQ Coupling*  

</blockquote>

When coupled with the G-quadruplex DNAzyme assay, both samples 1 and 2 exhibited a slight colour change (*[Figure 2](#figure-2)*). In this experiment, the product of a failed RCA served as a negative control in the downstream G-quadruplex DNAzyme assay. This failure was likely due to the unsuccessful circularisation of a second-generation RCA template, which inhibited the RCA process (see [E1.2](#e12-second-generation-rca-template-treated-with-exonuclease-i)). Additionally, we conducted a positive control reaction mixture using IDT-synthesised G-quadruplex DNAzyme ([BBa_K5041001](https://parts.igem.org/Part:BBa_K5041001)), which resulted in a stronger colour change compared to the RCA-generated G-quadruplex DNAzyme.  

### Learn
The results of this experiment indicate that an interfering factor was present in the RCA template, triggering the RCA process in both cases, regardless of the presence of the primer. Experiments [E1.3](#e13-third-generation-rca-template-treated-with-triton-x-100-and-exonuclease-i) and [E1.4](#e14-third-generation-rca-template-treated-with-exonuclease-i-and-iii) were conducted to troubleshoot and address this issue. Additionally, [section 2](#e2-rca-gq-coupling-signal-optimisation) discusses the troubleshooting processes for the weak output signal in greater depth.  

## [E1.2] Second-Generation RCA template Treated with Exonuclease I
> See protocols [[P04]](/notebook#p04) and [[P05]](/notebook#p05)  
> Keyword: FAILED RCA, FAILED TEMPLATE CIRCULARISATION  

### Design

<blockquote id="figure-3">

![Figure 3: Second-Generation RCA Template (v2)](/assets/engineering-success-images/ES3.png)

Figure 3: *Second-Generation RCA Template (v2)*

</blockquote>

Due to the inability of the first-generation (v1) RCA-GQ coupling to produce a strong result (see [E2.3](#e23-first-generation-rca-in-rcutsmart-buffer-without-dtt)), we redesigned our template to promote increased amplification of the G-quadruplex DNAzyme during the RCA process, aiming to as well increase the signal expression level in our G-quadruplex DNAzyme assay. Our new second-generation (v2) RCA template is an 86bp long ssDNA with a phosphate group at the 5'end. The template contains two repeats of the G-quadruplex DNAzyme complementary sequences, the annealing sites for the RCA primer and the second-generation RCA scaffold, as well as three cutting sites for Nt.BsmAI (*[Figure 3](#figure-3)*). The cutting by Nt.BsmAI is designed to separate individual G-quadruplex DNAzyme structures and to exponentially amplify the RCA primer throughout the RCA process.  

### Build

The linear single-stranded second-generation RCA template was circularised through a padlock probe ligation method involving the second-generation RCA scaffold which shares the same sequences as the third-generation (v3) RCA scaffold ([BBa_K5041005](https://parts.igem.org/Part:BBa_K5041005)) and T4 DNA Ligase (New England Biolabs). The circular template was then treated with Exonuclease I (Thermo Fisher Scientific). All DNAs used in this experiment were obtained from Integrated DNA Technologies.  

### Test

#### RCA Results

<blockquote id="figure-4">

![Figure 4: RCA using ExoI-Treated Template (v2)](/assets/engineering-success-images/ES4.png)  

Figure 4: *RCA using ExoI-Treated Template (v2)*  

</blockquote>

In the gel electrophoresis result (*[Figure 4](#figure-4)*), lane 1 contained both the second-generation template and the IDT-synthesised RCA primer, while lane 2 contained only the second-generation template. Both lanes did not show any visible bands above the 10,000bp DNA marker, suggesting that the RCA process had failed in both samples.  

### Learn

While the absence of the RCA primer did not affect the success or failure of the RCA reaction on both lanes, the presence of the RCA primer did affect the amplification rate of the RCA process, according to the gel result. The shorter bands visible on lane 1 were possibly due to the ligation of two or more linear single-stranded second-generation RCA templates due to the RCA scaffold acting as a splint DNA flanking across two linear RCA templates. It is only visible on lane 1 due to a higher amplification rate in the presence of the RCA primer.  

Moreover, no product larger than 10,000bp was generated from both RCA reaction mixtures, suggesting a failure in circularising the second-generation RCA template. This issue was troubleshot in our following experiments (see [E1.3](#e13-third-generation-rca-template-treated-with-triton-x-100-and-exonuclease-i) and [E1.4](#e14-third-generation-rca-template-treated-with-exonuclease-i-and-iii)).  

## [E1.3] Third-Generation RCA Template Treated with Triton X-100 and Exonuclease I
> See protocols [[P06]](/notebook#p06) and [[P07]](/notebook#p07)  
> Keyword: FALSE POSITIVE  

### Design

Firstly, due to the false positive result in [E1.1](#e11-first-generation-rca-template-treated-with-exonuclease-i) and the assumption that the RCA scaffold in [E1.1](#e11-first-generation-rca-template-treated-with-exonuclease-i) was not completely removed from the first-generation (v1) RCA template, we tested a method of Exonuclease I treatment, supplemented by the addition of Triton to detach the RCA scaffold from the RCA template following the circularisation process. Secondly, as a result of the weak signal expressed by the G-quadruplex DNAzyme from the first-generation RCA template and the failed RCA process from the second-generation (v2) RCA template, we designed a third-generation (v3) RCA template ([BBa_K5041004](https://parts.igem.org/Part:BBa_K5041004)) and scaffold ([BBa_K5041005](https://parts.igem.org/Part:BBa_K5041005)). The third-generation RCA template shares features similar to the second-generation, with one repeat of each G-quadruplex DNAzyme complementary sequence and the Nt.BsmAI cutting site removed, resulting in a shorter 62bp ssDNA compared to the second generation. Similarly, the cutting by Nt.BsmAI is designed to separate individual G-quadruplex DNAzyme structures and exponentially amplify the RCA primer throughout the RCA process.  

### Build
The linear single-stranded third-generation RCA template was circularised through a padlock probe ligation method involving the third-generation RCA scaffold and T4 DNA Ligase (New England Biolabs). The circular template was then treated with Exonuclease I (Thermo Fisher Scientific) and Triton X-100 (Bio-Rad Laboratories). All DNAs used in this experiment were obtained from Integrated DNA Technologies.  

### Test

#### RCA Results

<blockquote id="figure-5">

![Figure 5: RCA using ExoI and Triton-Treated Template (v3)](/assets/engineering-success-images/ES5.png)  

Figure 5: *RCA using ExoI and Triton-Treated Template (v3)*  

</blockquote>

In the gel electrophoresis result (*[Figure 5](#figure-5)*), lane 1 contained both the third-generation template (treated with Triton and Exonuclease I) and the IDT-synthesised RCA primer, while lane 2 contained only the third-generation template (treated with Triton and Exonuclease I). Lane 3 contained the third-generation template (treated Exonuclease I only) and the IDT-synthesised RCA primer, while lane 4 contained only the third-generation template (treated Exonuclease I only).  

All lanes exhibited similar smeared bands, with a size greater than 10,000bp, which suggests that successful RCA occurred in all samples.  

### Learn
This troubleshooting process did not solve our concurring issue of false positive results. The combined Triton and Exonuclease I treatment was not sufficient to remove the attaching scaffold, which presumably contributed to the constantly occurring false positives. Follow-up troubleshooting is described in [E1.4](#e14-third-generation-rca-template-treated-with-exonuclease-i-and-iii).  

## [E1.4] Third-Generation RCA Template Treated with Exonuclease I and III
> See protocols [[P08]](/notebook#p08), [[P09]](/notebook#p09), and [[P10]](/notebook#p10)  
> Keyword: SUCCESSFULLY ELIMINATED FALSE POSITIVE  

### Design
The third-generation (v3) RCA template (BBa_K5041004) features one repeat of the G-quadruplex DNAzyme complementary sequence, the Nt.BsmAI cutting site and primer binding site, resulting in a total length of 62nt ssDNA. As described in [E1.3](#e13-third-generation-rca-template-treated-with-triton-x-100-and-exonuclease-i), our third-generation RCA template rendered false positives even after being treated with Triton X-100. To address this problem, we went for another troubleshooting process and decided to modify our circularisation method.  

### Build
The linear single-stranded third-generation RCA template was circularised through a padlock probe ligation method involving the third-generation RCA scaffold ([BBa_K5041005](https://parts.igem.org/Part:BBa_K5041005)) and T4 DNA Ligase (New England Biolabs). The circular template was then treated with Exonuclease I (Thermo Fisher Scientific) and Exonuclease III (TaKaRa Bio). All DNAs used in this experiment were obtained from Integrated DNA Technologies.  

### Test

#### RCA Results

<blockquote id="figure-6">

![Figure 6: RCA using ExoI- and ExoIII-Treated Template (v3)](/assets/engineering-success-images/ES6.png)  

Figure 6: *RCA using ExoI- and ExoIII-Treated Template (v3)*  

</blockquote>

In the gel electrophoresis result (*[Figure 6](#figure-6)*), lane 1 contained both the third-generation template (treated with Exonuclease I and III) and the IDT-synthesised RCA primer in a mixture with Nt.BsmAI nicking endonuclease (New England Biolabs). Lane 2 contained both the third-generation template (treated with Exonuclease I and III) and the IDT-synthesised RCA primer without Nt.BsmAI. Lane 3 contained only the third-generation template (treated with Exonuclease I and III) without primer nor Nt.BsmAI.  

Lane 1 exhibited a smearing band across the entire lane, indicating successful RCA and a successful cut by Nt.BsmAI. Lane 2 exhibited a smearing band, concentrated at a size larger than 10,000bp, which suggests that successful RCA occurred in the sample. Lane 3 did not have any visible band, indicating that we successfully obtained both true negative and positive results from this circularisation method.  

#### RCA-GQ Coupling Results

<blockquote id="figure-7">

![Figure 7: RCA-GQ Coupling using ExoI- and ExoIII-Treated Template (v3)](/assets/engineering-success-images/ES7.png)  

Figure 7: *RCA-GQ Coupling using ExoI- and ExoIII-Treated Template (v3)*  

</blockquote>

When coupled with the G-quadruplex DNAzyme assay, both samples 1 and 2 exhibited a slight colour change (*[Figure 7](#figure-7)*), while sample 3, the negative RCA result, did not show any colour change. The last shown sample was a positive control reaction mixture using IDT-synthesised G-quadruplex DNAzyme ([BBa_K5041001](https://parts.igem.org/Part:BBa_K5041001)), which resulted in a stronger colour change compared to the RCA-generated G-quadruplex DNAzyme.  

### Learn
This troubleshooting process confirmed that Exonuclease I treatment was not sufficient to remove the attaching scaffold, which presumably contributed to the constantly occurring false positives. The addition of Exonuclease III into the circularisation reaction mixture eliminated the problem. However, the signal remains weak from the RCA-GQ coupling, which will be further addressed in [E2.6](#e26-third-generation-with-different-template-concentrations).  

# [E2] RCA-GQ Coupling Signal Optimisation

## [E2.1] DNA-Cleaving DNAzymes Test
> See protocol [[P11]](/notebook#p11)  
> Keyword: FAILED DNA-CLEAVING

### Design

Our first-generation (v1) circular template (BBa_K5041002) is a 49bp long ssDNA with a phosphate group at the 5' end. This first-generation circular template contains the G-quadruplex DNAzyme complementary sequences, the annealing sites for the first-generation RCA scaffold and RCA primer, as well as the cutting sites for two DNA-cleaving DNAzymes. The DNA-cleaving DNAzymes were designed to cleave the RCA products and promote exponential RCA by releasing the amplified primer.  

The two DNA-cleaving DNAzymes used in this experiment are (`5'-AGCGGCCATTATACCGGGCAACTATTGCCTCGTCATCGCTATTTTCTGCGACCCACCCA-3'`) and (`5'-CCACCCACCTATACCGGGCAACTATTGCCTCGTCATCGCTATTTTCTGCGTGGCAGAAA-3'`). We also designed a 147nt ssDNA fragment consisting of three repeats of the G-quadruplex DNAzyme sequences and DNA-cleaving DNAzymes cutting sites to simulate the RCA product. All DNA used in this experiment was sourced from Integrated DNA Technologies (IDT).  

### Test

#### DNA-Cleaving DNAzymes Test

<blockquote id="figure-8">

![Figure 8: DNA-Cleaving DNAzymes Test](/assets/engineering-success-images/ES8.png)  

Figure 8: *DNA-Cleaving DNAzymes Test*  

</blockquote>

In the gel electrophoresis result (*[Figure 8](#figure-8)*), lane 1 contained the DNA-cleaving DNAzymes with the 147nt ssDNA fragment. Lane 2 contained the 147nt ssDNA fragment only, while lane 3 contained one of the 59nt DNA-cleaving DNAzymes. Lane 2 was not loaded with the same amount of 147nt ssDNA fragment as in lane **(!)**.  

The result showed no catalytic activity from the DNA-cleaving DNAzymes since the 147nt fragment remains visible in lane 1, and the only other visible band in lane 1 was similar to that of lane 3. This indicated that lane 1 only contained the uncut 147nt fragment with 59nt DNA-cleaving DNAzymes.  

### Learn

The results of this experiment indicate that we were unable to use the DNA-cleaving DNAzymes to cut our first-generation RCA products. This contributed to the decision not to use the DNA-cleaving DNAzymes during RCA in [E1.1](#e11-first-generation-rca-template-treated-with-exonuclease-i). This also influenced our decision to move our direction to the use of nicking endonuclease in our second- and third-generation RCA templates (see [E1.2](#e12-second-generation-rca-template-treated-with-exonuclease-i)). Additionally, the change of direction was also taken by considering the facilitation of RCA and G-quadruplex DNAzyme assay coupling. In other words, coupling RCA and G-quadruplex DNAzyme assays with this method may not be ideal since the DNA-cleaving DNAzymes require different buffer conditions.  

## [E2.2] First-Generation RCA in rCutSmart Buffer
> See protocols [[P12]](/notebook#p12), [[P13]](/notebook#p13), and [[P14]](/notebook#p14)  
> Keyword: Φ29 IN rCUTSMART, FAILED SIGNAL EXPRESSION  

### Design

In our project mechanism, both the RCA and primer extraction processes are to be completed in one reaction mixture. To facilitate this coupling, the RCA process needs to be compatible with the rCutSmart Buffer so that all three enzymes, HhaI (New England Biolabs), Nt.BsmAI (New England Biolabs), and Φ29 DNA polymerase (New England Biolabs and Beyotime Biotechnology) can work together at the same time. Usually, Φ29 DNA polymerase is supplied with a 10X reaction buffer; however, Φ29 DNA polymerase is compatible with rCutSmart buffer when additional dithiothreitol (DTT) is added to the reaction [[1]](#reference-1).  

Our first-generation (v1) circular template ([BBa_K5041002](https://parts.igem.org/Part:BBa_K5041002)) is a 49bp long ssDNA with a phosphate group at the 5' end. This first-generation circular template contains the G-quadruplex DNAzyme complementary sequences, the annealing sites for the first-generation RCA scaffold and RCA primer, as well as the cutting sites for two DNA-cleaving DNAzymes. The DNA-cleaving DNAzymes, however, were not used in this experiment (see [E2.1](#e21-dna-cleaving-dnazymes-test) for details).  

### Build
The linear single-stranded first-generation RCA template was circularised using a padlock probe ligation method, which involved the first-generation RCA scaffold ([BBa_K5041003](https://parts.igem.org/Part:BBa_K5041003)) and T4 DNA Ligase (New England Biolabs). Subsequently, the first-generation circular template was treated with Exonuclease I (Thermo Fisher Scientific). All DNA used in this experiment was sourced from Integrated DNA Technologies (IDT).  

### Test

#### RCA Results

<blockquote id="figure-9">

![Figure 9: RCA (v1) Using rCutSmart Buffer with Additional DTT](/assets/engineering-success-images/ES9.png)  

Figure 9: *RCA (v1) Using rCutSmart Buffer with Additional DTT*  

</blockquote>

In the gel electrophoresis result (*[Figure 9](#figure-9)*), the (+) lane consisted of both the first-generation template and the IDT-synthesised RCA primer. The lane exhibited similar smeared bands, with a size greater than 10,000bp, which suggests that successful RCA occurred in the sample. This proved that Φ29 is compatible with the rCutSmart Buffer in the presence of additional DTT.  

#### RCA-GQ Coupling Results

<blockquote id="figure-10">

![Figure 10: RCA(v1)-GQ Coupling](/assets/engineering-success-images/ES10.png)  

Figure 10: *RCA(v1)-GQ Coupling*  

</blockquote>

When coupled with the G-quadruplex DNAzyme assay, the RCA product did not induce a colour change, as shown in *[Figure 10](#figure-10)*. A control set-up with IDT-synthesised G-quadruplex sequences ([BBa_K5041001](https://parts.igem.org/Part:BBa_K5041001)) exhibited a strong colour change but remained transparent in addition to DTT.  

### Learn
We thus found out that DTT is a reducing agent, while the colour change in the G-quadruplex assay is dependent on the oxidation of tetramethylbenzidine (TMB) to TMB⁺. The presence of DTT in the reaction mixture most likely inhibited the oxidation of TMB, preventing any observation of colour change. [E2.3](#e23-first-generation-rca-in-rcutsmart-buffer-without-dtt) was conducted to troubleshoot this issue.  

## [E2.3] First-Generation RCA in rCutSmart Buffer without DTT
> See protocols [[P15]](/notebook#p15), [[P16]](/notebook#p16), and [[P17]](/notebook#p17)  
> Keyword: Φ29 IN rCUTSMART WITHOUT DTT, WEAK SIGNAL EXPRESSION  

### Design
With our discovery in [E2.1](#e21-dna-cleaving-dnazymes-test), we decided to rerun the reaction without additional (dithiothreitol) DTT added into the RCA reaction mixture with first-generation (v1) RCA template ([BBa_K5041002](https://parts.igem.org/Part:BBa_K5041002)) and scaffold ([BBa_K5041003](https://parts.igem.org/Part:BBa_K5041003)).  

### Build
The linear single-stranded first-generation RCA template was circularised using a padlock probe ligation method, which involved the first-generation RCA scaffold and T4 DNA Ligase (New England Biolabs). Subsequently, the first-generation circular template was treated with Exonuclease I (Thermo Fisher Scientific). All DNA used in this experiment was sourced from Integrated DNA Technologies (IDT).  

### Test

#### RCA Results

<blockquote id="figure-11">

![Figure 11: RCA (v1) in rCutSmart Buffer without DTT](/assets/engineering-success-images/ES11.png)  

Figure 11: *RCA (v1) in rCutSmart Buffer without DTT*  

</blockquote>

In the gel electrophoresis result (*[Figure 11](#figure-11)*), lane 1 consisted of both the first-generation template and the IDT-synthesised RCA primer, while lane 2 consisted only of the template. The lanes exhibited similar smeared bands, with a size greater than 10,000bp, which suggests that successful RCA occurred in both of the samples. Though having a false positive result (see [E1.1](#e11-first-generation-rca-template-treated-with-exonuclease-i) for details), the RCA reaction was successful despite the absence of additional DTT.  

#### RCA-GQ Coupling Results

<blockquote id="figure-12">

![Figure 12: RCA(v1)-GQ Coupling](/assets/engineering-success-images/ES12.png)  

Figure 12: *RCA(v1)-GQ Coupling*  

</blockquote>

When coupled with the G-quadruplex DNAzyme assay (*[Figure 12](#figure-12)*), the first sample of the RCA product induced a slight colour change, as shown in *[Figure 10](#figure-10)*, while the false positive RCA sample showed no colour change.  

### Learn
This result provided us with two sets of information. Firstly, of that compatibility of Φ29 in rCutSmart buffer without additional DTT. Secondly, this troubleshooting process does not completely solve the problem since the expressed signal was not strong enough. One possible reason is because of the presence of DTT in the enzymes' storing buffer, which is also transferred to the RCA reaction mixture. A follow-up troubleshooting was conducted to address this problem, as described in [E1.2](#e12-second-generation-rca-template-treated-with-exonuclease-i).  

## [E2.4] G-Quadruplex Concentration and Signal Expression Correlation
> See protocol [[P18]](/notebook#p18)  
> Keyword: SIGNAL EXPRESSION CORRELATION  

### Design
With the constantly occurring weak signals, we tried to brainstorm potential factors contributing to the signal expression level. One experiment we did to troubleshoot this problem was assessing the correlation of the G-quadruplex concentration in the reaction mixture and the signal expressed. Thus, we used the IDT-synthesised G-quadruplex sequences ([BBa_K5041001](https://parts.igem.org/Part:BBa_K5041001)) in different concentrations to assess whether it contributed to the strength of the signal.  

### Test

#### G-Quadruplex DNAzyme Assay Results

<blockquote id="figure-13">

![Figure 13: G-Quadruplex Concentration Assay Test](/assets/engineering-success-images/ES13.png)  

Figure 13: *G-Quadruplex Concentration Assay Test*  

</blockquote>

We prepared 4 reaction mixtures, with 1.2µM, 0.8µM, 0.4µM, and 0.04µM of IDT-synthesised G-quadruplex structure, respectively. As shown in *[Figure 13](#figure-13)*, a significant difference was exhibited by the sample that contained the least amount of the G-quadruplex structure.  

### Learn
Though the G-quadruplex Structure is a peroxidase-mimicking DNAzyme, which mimics the ability of an enzyme, the concentration of the structure in the solution influences the final colour of the reaction. This means we must increase the quantity of the G-quadruplex DNAzyme to obtain a stronger signal.  

## [E2.5] Third-Generation RCA Without Exonuclease I Treatment
> See protocols [[P19]](/notebook#p19), [[P20]](/notebook#p20), and [[P21]](/notebook#p21)  
> Keyword: THIRD-GENERATION RCA, STRONG SIGNAL EXPRESSION

### Design
The third-generation (v3) RCA template ([BBa_K5041004](https://parts.igem.org/Part:BBa_K5041004)) features one repeat of the G-quadruplex DNAzyme complementary sequence, the Nt.BsmAI cutting site and primer binding site, resulting in a total length of 62nt ssDNA. As described in [E1.3](#e13-third-generation-rca-template-treated-with-triton-x-100-and-exonuclease-i), our third-generation RCA template rendered false positives even after being treated with Triton X-100 and Exonuclease I. Thus, to solve the weak signal generation simultaneously with eliminating false positives, we designed this experiment using a third-generation RCA template without any treatment. This means that the RCA scaffold remains attached to the circularised template.  

### Build
The linear single-stranded third-generation RCA template was circularised through a padlock probe ligation method involving the third-generation RCA scaffold ([BBa_K5041005](https://parts.igem.org/Part:BBa_K5041005)) and T4 DNA Ligase (New England Biolabs). All DNAs used in this experiment were obtained from Integrated DNA Technologies.  

### Test

#### RCA Results

<blockquote id="figure-14">

![Figure 14: RCA (v3) Without ExoI Treatment](/assets/engineering-success-images/ES14.png)  

Figure 14: *RCA (v3) Without ExoI Treatment*  

</blockquote>

In the gel electrophoresis result (*[Figure 14](#figure-14)*), lane 1 contained both the third-generation template and the IDT-synthesised RCA primer in a mixture with Nt.BsmAI nicking endonuclease (New England Biolabs). Lane 2 contained both the third-generation template and the IDT-synthesised RCA primer without Nt.BsmAI.  

Lane 1 exhibited a smearing band across the entire lane, indicating successful RCA and successfully cut by Nt.BsmAI. Lane 2 exhibited a smearing band, concentrated at a size larger than 10,000bp, which suggests that successful RCA occurred in the sample.  

#### RCA-GQ Coupling Results

<blockquote id="figure-15">

![Figure 15: RCA-GQ Coupling Without ExoI Treatment](/assets/engineering-success-images/ES15.png)  

Figure 15: *RCA-GQ Coupling Without ExoI Treatment*  

</blockquote>

When coupled with the G-quadruplex DNAzyme assay, both samples 1 and 2 exhibited a visible colour change (*[Figure 15](#figure-15)*), stronger than the result observed in previous experiments [E2.3](#e23-first-generation-rca-in-rcutsmart-buffer-without-dtt) and [E1.1](#e11-first-generation-rca-template-treated-with-exonuclease-i). The positive control reaction mixture using IDT-synthesised G-quadruplex DNAzyme ([BBa_K5041001](https://parts.igem.org/Part:BBa_K5041001)), however, resulted in a stronger colour change compared to the RCA-generated G-quadruplex DNAzyme.  

### Learn
This troubleshooting process indicated that stronger signals can be obtained from the RCA-generated G-quadruplex DNAzyme.  

## [E2.6] Third-Generation with Different Template Concentrations
> See protocols [[P22]](/notebook#p22), [[P23]](/notebook#p23), and [[P24]](/notebook#p24)  
> Keyword: THIRD-GENERATION RCA, SUCCESSFUL  

### Design
Building upon the successful [E1.4](#e14-third-generation-rca-template-treated-with-exonuclease-i-and-iii), we tried to further optimise the expressed signals. From [E2.4](#e24-g-quadruplex-concentration-and-signal-expression-correlation), we understand that G-quadruplex concentration contributes to the final signals, and it is possible to obtain stronger signals from RCA-generated G-quadruplex DNAzyme (see [E2.5](#e25-third-generation-rca-without-exonuclease-i-treatment)). Hence, we tested different quantities of the third-generation (v3) RCA template ([BBa_K5041004](https://parts.igem.org/Part:BBa_K5041004)) in the RCA reaction to observe its correlation with the signal expression level.  

### Build
The linear single-stranded third-generation RCA template was circularised through a padlock probe ligation method involving the third-generation RCA scaffold ([BBa_K5041005](https://parts.igem.org/Part:BBa_K5041005)) and T4 DNA Ligase (New England Biolabs). The circular template was then treated with Exonuclease I (Thermo Fisher Scientific) and Exonuclease III (TaKaRa Bio). All DNAs used in this experiment were obtained from Integrated DNA Technologies.  

### Test

#### RCA Results

<blockquote id="figure-16">

![Figure 16: RCA (v3) using ExoI- and ExoIII-Treated Template with Different Concentrations](/assets/engineering-success-images/ES16.png)  

Figure 16: *RCA (v3) using ExoI- and ExoIII-Treated Template with Different Concentrations*  

</blockquote>

In the gel electrophoresis result (*[Figure 16](#figure-16)*), lanes 1-4 contained the third-generation template (treated with Exonuclease I and III) and the IDT-synthesised RCA primer in a mixture with Nt.BsmAI nicking endonuclease (New England Biolabs). The template quantities are 1ng, 2ng, 4ng, and 8ng respectively. Lane 5 contained both the third-generation template (treated with Exonuclease I and III) and the IDT-synthesised RCA primer without Nt.BsmAI. Lane 6 contained only the third-generation template (treated with Exonuclease I and III) without primer nor Nt.BsmAI.  

Lanes 1-4 exhibited a smearing band across the entire lane, indicating successful RCA and a successful cut by Nt.BsmAI. The intensity of the band also increases with more templates in the reaction. Lane 5 exhibited a smearing band, concentrated at a size larger than 10,000bp, which suggests that successful RCA occurred in the sample. Lane 6 had no visible band, indicating that we successfully obtained true negative results from this circularisation method.  

#### RCA-GQ Coupling Results

<blockquote id="figure-17">

![Figure 17: RCA(v3)-GQ Coupling using ExoI- and ExoIII-Treated Template with Different Concentrations](/assets/engineering-success-images/ES17.png)  

Figure 17: *RCA(v3)-GQ Coupling using ExoI- and ExoIII-Treated Template with Different Concentrations*  

</blockquote>

When coupled with the G-quadruplex DNAzyme assay, both samples 1 and 2 exhibited a similar slight colour change (*[Figure 17](#figure-17)*), while samples 3 and 4 had a stronger colour change. Sample 5 had a similar colour change as 1, while sample 6 did not show any colour change. The last shown sample was a positive control reaction mixture using IDT-synthesised G-quadruplex DNAzyme ([BBa_K5041001](https://parts.igem.org/Part:BBa_K5041001)), which still resulted in a stronger colour change than the RCA-generated G-quadruplex DNAzyme.  

### Learn
This experiment confirmed that a stronger signal can be obtained by increasing the template quantity in the reaction. With these results, a new standard of 4ng template in a 20 µl reaction will be used in our future experiments. However, this result did not prove that third-generation RCA products are generated by both the RCA process and the RCA process.BsmAI cutting is more effective than uncut RCA products. This result also did not prove that the third-generation RCA template yielded a better result than the first-generation RCA template. These two limitations are to be addressed in the future, in addition to the primer extraction-RCA coupling method validation.  


# References
1. "Activity of DNA modifying enzymes in rCutSmart™ buffer", New England Biolabs, https://www.neb.com/en/tools-and-resources/usage-guidelines/activity-of-dna-modifying-enzymes-in-cutsmart-buffer (accessed Sep. 25, 2024).