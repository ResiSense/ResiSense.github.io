🚧 Under construction  

As described in our [project description](/project/description), we are developing a point-of-care test kit, ResiSense, for the screening of antibiotic resistance genes. Our proposed detection system consists of three parts: target gene extraction, rolling circle amplification (RCA), and signal expression. This page describes how we designed the experimental settings to prove the concept that we proposed, and the rationale behind those designs. Due to safety concerns, all of our experiments are carried out using Escherichia coli (E. coli) as the chassis instead of the actual pathogenic resistant bacteria.  

# Plasmid Construction
For proof of concept purposes, we constructed a pSB1C3-KPC-2-surrogate plasmid that carries a short snippet of the KPC-2 gene by assembling the KPC-2-surrogate gene fragment [PARTS NO] with pSB1C3 backbone using the RFC 10 BioBricks assembly standard [1]. First, we performed PCR to the KPC-2 surrogate gene fragment to amplify its quantity. The KPC-2-surrogate is designed to be compatible with RFC[10], thus, both the KPC-2-surrogate PCR product and pSB1C3 backbone (from Interlab 2018 Test Device 5, Distribution Kit 2024 [PARTS NO]) were cut using EcoRI and PstI (Anza, Thermo Fisher Scientific) and ligated using T4 DNA ligase (New England Biolabs). This ligation product was then cloned with chemically competent DH5ɑ E. coli cells and extracted using the miniprep kit (iNtRON Biotechnology). The cloned plasmid was then sent for sequencing (BGI Genomics) and the result was satisfactory.  

# Rolling Circle Amplification (RCA) Template Construction
To facilitate the RCA process, we have constructed a circularised third-generation (v3) RCA template [PARTS NO] with the following sequence:  

***[TK]***

The linear oligonucleotide strand was synthesised by IDT and assembled into circular ssDNA form using IDT-synthesised scaffold (5’-gccaccgcggtctcacgggt-3’) and T4 DNA ligase (New England Biolabs), and thus, treated with Exonuclease I and III (Thermo Fisher Scientific and Takara Bio) to remove the remaining scaffold.  

# Cell Lysis
Prior to the detection system, the collected bacterial sample must be lysed to release its bacterial DNA. In this proof of concept stage, we choose to lyse the cells using SDS. Using SDS to lyse bacterial cells has been an established procedure, which is used in the extraction of plasmids from bacteria using miniprep kits [2], SDS lysis could serve as a benchmark for lysis efficiency and plasmid yield when compared to other lysis methods or buffer compositions. The proof of our methodology in lysing the cells using SDS can be viewed in our [results](/wet-lab/results#lysis) page.  

# Target Gene Extraction
After cell lysis, a snippet of the target gene, which is responsible for antibiotic resistance, is cut using a restriction enzyme and a nickase. The nickase is used to cut the 3’ side of the double-stranded DNA (dsDNA), while a restriction enzyme cuts the 5’ side of the gene snippet. The restriction enzyme and nickase used to digest the plasmid in the proof of concept stage are HhaI and Nt.BsmAI (New England Biolabs) respectively.  

Following the digestion, phi29 DNA polymerase (New England Biolabs and Beyotime Biotechnology) releases a single-stranded DNA (ssDNA) through linear strand displacement amplification (LSDA). Phi-29 binds to the nicked 5’ end of the gene, which is the pSB1C3-KPC-2-surrogate in this proof of concept, and then amplifies one strand of the plasmid up to the HhaI cutting site. This process is expected to amplify a 32 nt ssDNA from the pSB1C3-KPC-2-surrogate plasmid, which will serve as the primer for the following steps, along with 724 and 534 nt ssDNA strands as the side products of this LSDA process.  

An experiment has also been conducted to test this process, and the results are shown [here](/wet-lab/results#ntbsmaihhai-lsda).  

# Rolling Circle Amplification (RCA)
The circularised RCA template consists of a primer binding site, where the 32 nt ssDNA from the previous step will bind to. Upon this binding, phi-29 DNA polymerase will start to add nucleotides following the primer 3’-end, according to sequences complementary to the RCA template [3]. During this step, we expect cells that do not carry KPC-2 gene will not produce complementary primer, thus, will not trigger the RCA process.  

After completing its first round along the RCA template, phi-29 will continue to replicate the RCA template while displacing the complementary strands that it has formed during its previous round [4]. By including the complementary strand of our peroxidase-mimicking G-quadruplex DNAzyme into the RCA template, the RCA process is expected to generate repeats of the G-quadruplex DNAzyme upon the primer binding.  

The RCA template also includes the recognition site of the Nt.BsmAI nicking endonuclease. Without Nt.BsmAI, this RCA process will generate a long continuous strand that consists of repeats of the RCA template. However, with the addition of Nt.BsmAI, the phi-29-produced strands will be nicked by the nickase prior to its displacement, producing shorter products out of the amplification process. This aims to increase the detection sensitivity by mediating exponential RCA [5].  

To test the RCA reactions and to eliminate interfering factors, we have also conducted the RCA experiments with synthetic RCA primer from IDT. We tested several conditions for the RCA process and the results can be viewed [here](/wet-lab/results#rca).  

# Signal Expression
The previous step of the system generates G-quadruplex structures that act as peroxidase-mimicking DNAzymes. The products from RCA are then set up into a reaction consisting of Hemin, TMB, and H2O2. If the RCA process was triggered, G-quadruplex DNAzyme will be formed, and thus produce a colour change of the reaction due to the oxidation of tetramethylbenzidine (TMB) to TMB+. The positive reaction is hence indicated by a blue colour while the negative reaction does not change colour from transparent.  

It is understood that the working mechanism of the DNAzyme involves the attachment of Hemin to the G-quadruplex structure, a guanine-rich DNA sequence stabilised by hydrogen bonds, to produce a stable complex [6]. Hemin's iron has the ability to move electrons around to catalyse the conversion of TMB to TMB+ [6].  

To confirm the process of the G-quadruplex DNAzyme reaction, we have also acquired an IDT-synthesised DNA [PARTS NO] that will fold into a G-quadruplex structure. All of the experiment results can be found [here](/wet-lab/results#g-quadruplex-dnazyme-assay).  

# Remarks
All processes in our detection system are aimed to be completed in isothermal conditions, specifically in room temperature. However, in the proof of concept stage, we mostly performed our experiments in the suggested optimum temperatures of the enzyme. Although we confirmed that most of the reactions can be carried out at 37°C or lower, further verification is required to assess its performance fully at room temperature.  

# References
1. "Help:Standards/Assembly/RFC10", Registry of Standard Biological Parts, https://parts.igem.org/Help:Standards/Assembly/RFC10 (accessed Sep. 24, 2024). 
2. "DNA-spinTM Plasmid DNA Purification Kit", iNtRON Biotechnology, https://intronbio.com:6001/intronbioen/product/product_view.php?PRDT_ID=1 (accessed Sep. 24, 2024). 
3. F. Li, Y. Zhou, H. Yin, and S. Ai, "Recent advances on signal amplification strategies in photoelectrochemical sensing of micrornas," *Biosensors and Bioelectronics*, vol. 166, p. 112476, Oct. 2020. doi:10.1016/j.bios.2020.112476 
4. R. Hull, "Assay, detection, and diagnosis of plant viruses", *Plant Virology*, pp. 755–808, 2014. doi:10.1016/b978-0-12-384871-0.00013-3 
5. H.X. Jiang, Z.Z. Liang, Y.H. Ma, D.M. Kong, and Z.Y. Hong, "G-quadruplex fluorescent probe-mediated real-time rolling circle amplification strategy for highly sensitive microrna detection", *Analytica Chimica Acta*, vol. 943, pp. 114–122, Nov. 2016. doi:10.1016/j.aca.2016.09.019 
6. N. Alizadeh, A. Salimi, and R. Hallaj, "Hemin/G-quadruplex horseradish peroxidase-mimicking dnazyme: Principle and biosensing application", *Advances in Biochemical Engineering/Biotechnology*, pp. 85–106, 2017. doi:10.1007/10_2017_37 
