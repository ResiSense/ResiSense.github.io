As described in our [Project Description](/description), we are developing a **point-of-care test kit**, **ResiSense**, to screen **antibiotic resistance genes**. Our proposed detection system consists of **target gene extraction**, **rolling circle amplification (RCA)**, and **signal expression**. This page describes how we designed the experimental settings to prove the proposed concept and the rationale behind those designs. Due to **safety concerns**, all of our experiments used ***Escherichia coli* (*E. coli*)** as the chassis instead of the pathogenic resistant bacteria.  

# Plasmid Construction

For proof of concept purposes, we constructed a **pSB1C3-KPC-2-surrogate plasmid** that carries a short snippet of the **KPC-2 gene** by assembling the **KPC-2-surrogate gene fragment ([BBa_K5041000](https://parts.igem.org/Part:BBa_K5041000))** with **pSB1C3 backbone** using the **RFC 10 BioBricks assembly standard** [[1]](#reference-1). Briefly, the partial sequence of the KPC-2-surrogate gene was **amplified by PCR** (TaKaRa Bio). Both the **RFC 10-compatible amplicons** and **pSB1C3** (from Interlab 2018 Test Device 5 [BBa_J364008](https://parts.igem.org/Part:BBa_J364008), Distribution Kit 2024) were then **double digested** with **EcoRI and PstI restriction enzymes** (Anza, Thermo Fisher Scientific) and assembled with **T4 ligation** (New England Biolabs). Ligation product was used to **transform chemically competent DH5α *E. coli***, and cloned plasmid was later harvested using **DNA-spin™ Plasmid DNA Purification Kit** (iNtRON Biotechnology) and verified by **Sanger sequencing** (BGI Genomics).  

# Rolling Circle Amplification Template Construction

To facilitate the RCA process, we have constructed a **circularised third-generation (v3) RCA template ([BBa_K5041004](https://parts.igem.org/Part:BBa_K5041004))** with the sequence as shown in *[Figure 1](#figure-1)*.  

<blockquote id="figure-1">

![[BBa_K5041004](https://parts.igem.org/Part:BBa_K5041004) template sequence](/assets/proof-of-concept-diagrams/template-sequence.png)  

Figure 1: *[BBa_K5041004](https://parts.igem.org/Part:BBa_K5041004) template sequence*  

</blockquote>

The **linear oligonucleotide strand** was synthesised by IDT and **assembled into circular ssDNA** form using IDT-synthesised **scaffold (`5'-GCCACCGCGGTCTCACGGGT-3'`)** and **T4 DNA ligase** (New England Biolabs), and thus, treated with **Exonuclease I and III** (Thermo Fisher Scientific and Takara Bio) to remove the remaining scaffold.  

# Cell Lysis

Prior to the detection system, the collected bacterial sample must be **lysed to release its bacterial DNA**. In this proof of concept stage, we choose to lyse the cells using **SDS**. Using SDS to lyse bacterial cells has been an established procedure, which is used in the extraction of plasmids from bacteria using **mini-prep kits** [[2]](#reference-2). SDS lysis could serve as a **benchmark for lysis efficiency and plasmid yield** when compared to other lysis methods or buffer compositions. The proof of our methodology in lysing the cells using SDS can be viewed [here](/results#cell-lysis-sds-treatment). *[Figure 2](#figure-3)* and *[Figure 3](#figure-3)* illustrate the process of cell lysis and its significance in the **downstream reactions**.  

<blockquote id="figure-2">

![Figure 2: Cell Lysis and Release of Genomic Material](/assets/proof-of-concept-diagrams/lysis.png)  

Figure 2: *Cell Lysis and Release of Genomic Material*  

</blockquote>

<blockquote id="figure-3">

![Figure 3: Indication of Antibiotic Resistance Gene](/assets/proof-of-concept-diagrams/lysis-indication.png)  

Figure 3: *Indication of Antibiotic Resistance Gene*  

</blockquote>

# Target Gene Extraction

After cell lysis, a **snippet of the target gene**, which is responsible for antibiotic resistance, is **cut using a restriction enzyme and a nickase**, as illustrated in *[Figure 4](#figure-4)*. The **nickase is used to cut the 3' side** of the double-stranded DNA (dsDNA), while the **restriction enzyme cuts the 5' side** of the gene snippet. The restriction enzyme and nickase used to digest the plasmid in the proof of concept stage are **HhaI** and **Nt.BsmAI** (New England Biolabs) respectively.  

<blockquote id="figure-4">

![Figure 4: Restriction Digestion by Restriction Enzyme (HhaI) and Nickase (Nt.BsmAI)](/assets/proof-of-concept-diagrams/restriction-digestion.png)  

Figure 4: *Restriction Digestion by Restriction Enzyme (HhaI) and Nickase (Nt.BsmAI)*  

</blockquote>

Following the digestion, **Φ29 DNA polymerase** (New England Biolabs and Beyotime Biotechnology) releases a single-stranded DNA (ssDNA) through **linear strand displacement amplification (LSDA)** as illustrated in *[Figure 5](#figure-5)*. **Φ-29 binds to the nicked 5' end** of the gene, which is the **pSB1C3-KPC-2-surrogate** in this proof of concept, and then **amplifies one strand of the plasmid up to the HhaI cutting site**. This process is expected to **amplify a 32nt ssDNA** from the pSB1C3-KPC-2-surrogate plasmid, which will serve as the **primer** for the following steps, along with **724 and 534nt ssDNA strands as the side products** of this LSDA process.  

<blockquote id="figure-5">

![Figure 5: Working Mechanism of Φ29 DNA Polymerase](/assets/proof-of-concept-diagrams/phi29.png)  

Figure 5: *Working Mechanism of Φ29 DNA Polymerase*  

</blockquote>

An experiment has also been conducted to test this process, and the results can be seen [here](/results#target-gene-extraction-nt-bsmai-hhai-lsda).  

# Rolling Circle Amplification

The circularised RCA template consists of a **primer binding site**, where the 32nt ssDNA from the previous step will bind to. As presented in *[Figure 6](#figure-6)*, upon this binding, Φ29 DNA polymerase will start to **add nucleotides following the primer 3'-end**, according to sequences complementary to the RCA template [[3]](#reference-3). During this step, we expect cells that do not carry KPC-2 gene **will not produce complementary primer**, thus, will not trigger the RCA process.  

After completing its first round along the RCA template, Φ29 will continue to **replicate the RCA template** while **displacing the complementary strands** that it has formed during its previous round [[4]](#reference-4). By including the complementary strand of our **peroxidase-mimicking G-quadruplex DNAzyme** into the RCA template, the RCA process is expected to **generate repeats of the G-quadruplex DNAzyme** upon the primer binding.  

<blockquote id="figure-6">

![Figure 6: Step of Rolling Circle Amplification](/assets/proof-of-concept-diagrams/rca.png)  

Figure 6: *Step of Rolling Circle Amplification*  

</blockquote>

The RCA template also includes the **recognition site of the Nt.BsmAI nicking endonuclease**. Without Nt.BsmAI, this RCA process will generate a **long continuous strand** that consists of repeats of the RCA template. However, with the addition of Nt.BsmAI, the Φ29-produced strands will be **nicked by the nickase prior to its displacement**, producing **shorter products** out of the amplification process, as shown in *[Figure 7](#figure-7)*. This aims to **increase the detection sensitivity** by mediating **exponential RCA** [[5]](#reference-5).  

<blockquote id="figure-7">

![Figure 7: Rolling Circle Amplification Product](/assets/proof-of-concept-diagrams/rca-product.png)  

Figure 7: *Rolling Circle Amplification Product*  

</blockquote>

To test the RCA reactions and to **eliminate interfering factors**, we have also conducted the RCA experiments with **synthetic RCA primer from IDT**. We tested **several conditions** for the RCA process and the results can be viewed [here](/results#rolling-circle-amplification).  

# Signal Expression

The previous step of the system generates **G-quadruplex structures** that act as **peroxidase-mimicking DNAzymes**. The products from RCA are then set up into a reaction consisting of **haemin**, **TMB**, and **H₂O₂**. If the RCA process was triggered, G-quadruplex DNAzyme will be formed, and thus produce an **observable colour change** of the reaction due to the **oxidation of tetramethylbenzidine (TMB) to TMB⁺**. The positive reaction is hence indicated by a **blue colour** while the negative reaction does not change colour and remains colourless. *[Figure 8](#figure-8)* illustrates the colour change reaction in the presence of the G-quadruplex DNAzyme.  

<blockquote id="figure-8">

![Figure 8: Colour Change of Reaction Mixture with G-Quadruplex DNAzyme](/assets/proof-of-concept-diagrams/signal-expression.png)  

Figure 8: *Colour Change of Reaction Mixture with G-Quadruplex DNAzyme*  

</blockquote>

It is understood that the working mechanism of the DNAzyme involves the **attachment of haemin to the G-quadruplex structure**, a guanine-rich DNA sequence **stabilised by hydrogen bonds**, to produce a stable complex [[6]](#reference-6). Haemin's iron has the ability to move electrons around to **catalyse the conversion of TMB to TMB⁺** [[6]](#reference-6).  

To confirm the process of the G-quadruplex DNAzyme reaction, we have also acquired an IDT-synthesised DNA ([BBa_K5041001](https://parts.igem.org/Part:BBa_K5041001)) that will fold into a G-quadruplex structure. All of the experiment results can be found [here](/results.signal-expression-g-quadruplex-dnazyme-assay).  

# Remarks

While our detection system is designed to operate in **isothermal conditions**, particularly at **room temperature**, our experiments in the proof of concept stage were largely conducted at the **suggested optimum temperatures** of the enzyme. We have confirmed that most reactions can occur at **37°C or lower**. However, the need for ongoing research is underscored by the requirement for further verification of the enzyme's performance at room temperature.  

# References

1. "Help:Standards/Assembly/RFC10", Registry of Standard Biological Parts, https://parts.igem.org/Help:Standards/Assembly/RFC10 (accessed Sep. 24, 2024).
2. "DNA-spinTM Plasmid DNA Purification Kit", iNtRON Biotechnology, https://intronbio.com:6001/intronbioen/product/product_view.php?PRDT_ID=1 (accessed Sep. 24, 2024).
3. F. Li, Y. Zhou, H. Yin, and S. Ai, "Recent advances on signal amplification strategies in photoelectrochemical sensing of micrornas", *Biosensors and Bioelectronics*, vol. 166, p. 112476, Oct. 2020. doi: [10.1016/j.bios.2020.112476](https://doi.org/10.1016/j.bios.2020.112476)
4. R. Hull, "Assay, detection, and diagnosis of plant viruses", *Plant Virology*, pp. 755–808, 2014. doi: [10.1016/b978-0-12-384871-0.00013-3](https://doi.org/10.1016/b978-0-12-384871-0.00013-3)
5. H.-X. Jiang, Z.-Z. Liang, Y.-H. Ma, D.-M. Kong, and Z.-Y. Hong, "G-quadruplex fluorescent probe-mediated real-time rolling circle amplification strategy for highly sensitive microrna detection", *Analytica Chimica Acta*, vol. 943, pp. 114–122, Nov. 2016. doi: [10.1016/j.aca.2016.09.019](https://doi.org/10.1016/j.aca.2016.09.019)
6. N. Alizadeh, A. Salimi, and R. Hallaj, "Haemin/G-quadruplex horseradish peroxidase-mimicking dnazyme: Principle and biosensing application", *Advances in Biochemical Engineering/Biotechnology*, pp. 85–106, 2017. doi: [10.1007/10_2017_3](https://doi.org/10.1007/10_2017_3)