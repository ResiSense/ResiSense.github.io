This page contains the protocols for the experiments throughout our project. For more information about each protocol, please refer to [Engineering Success](/engineering).  

# Protocol Entries

## Entry [P01]
> See experiment [E1.1](/engineering#e1-1-first-generation-rca-template-treated-with-exonuclease-i)  
> See *[Development of Robust ssDNA Circularisation Protocol](/contribution#development-of-robust-ssdna-circularisation-protocol)*  

1. Into a PCR tube, add:

|                                         | Sample 1  |
| :-------------------------------------- | :-------- |
| RCA linear template (v1) (100 µM stock) | 2 μL      |
| Linear scaffold DNA (v1) (100 µM stock) | 2 μL      |
| ddH₂O                                   | 13 μL     |
| **TOTAL**                               | **17 μL** |

2. Incubate the reaction mixture at 95°C for 5 minutes; set the thermocycler to gradually cool down to 25°C.  
3. Into the same PCR tube, add:

|                              | Sample 1  |
| :--------------------------- | :-------- |
| Reaction mixture from step 1 | 17 μL     |
| 10× T4 Ligase Buffer         | 2 μL      |
| T4 Ligase                    | 1 μL      |
| **TOTAL**                    | **20 μL** |

1. Incubate at 22°C for 15 minutes.  
2. Perform oligonucleotide purification protocol to the reaction mixture, and elute with 17 μL ddH₂O preheated at 65°C.  
3. Into a new PCR tube, add:

|                                      | Sample 1  |
| :----------------------------------- | :-------- |
| Oligonucleotide purification product | 17 μL     |
| 10× Exonuclease I reaction buffer    | 2 μL      |
| Exonuclease I                        | 1 μL      |
| **TOTAL**                            | **20 μL** |

7. Incubate at 37°C for 2 hours.  
8. Perform oligonucleotide purification protocol to the reaction mixture, and elute with 20 μL ddH₂O preheated at 65°C.  
9. Measure the sample concentration and dilute to 1 ng/μL.

## Entry [P02]
> See experiment [E1.1](/engineering#e1-1-first-generation-rca-template-treated-with-exonuclease-i)

1. Into the PCR tube, add:

|                                   | (1) (+) With IDT primer | (2) (-) Without primer |
| :-------------------------------- | :---------------------- | :--------------------- |
| ddH₂O                             | 12 μL                   | 14 μL                  |
| rCutSmart Buffer                  | 2 μL                    | 2 μL                   |
| dNTP mix (10 mM each, stock)      | 2 μL                    | 2 μL                   |
| RCA template (v1) (1 ng/μL stock) | 1 μL                    | 1 μL                   |
| RCA primer (10 µM stock)          | 2 μL                    | -                      |
| **TOTAL**                         | **19 μL**               | **19 μL**              |

2. Incubate at 95°C for 5 minutes, and then return to ice.  
3. Add 1 μL of Φ29 DNA polymerase to each tube.  
4. Incubate at 30°C for 2 hours.  
5. Perform heat inactivation at 65°C for 10 minutes.  
6. Run 10 μL of each sample to gel electrophoresis using 0.8% Agarose/TAE gel with RedSafe.

## Entry [P03]
> See experiment [E1.1](/engineering#e1-1-first-generation-rca-template-treated-with-exonuclease-i)

1. Into each PCR tube, add:

|                              | (1)                                | (2)                               | (-) control           | (+) control                        |
| :--------------------------- | :--------------------------------- | :-------------------------------- | :-------------------- | :--------------------------------- |
| 10× G-quadruplex buffer      | 12.5 μL                            | 12.5 μL                           | 12.5 μL               | 12.5 μL                            |
| G-quadruplex sample          | 10 μL from (1) (+) With IDT primer | 10 μL from (2) (-) Without primer | 10 μL from failed RCA | 6.25 μL from IDT G-quad 8 µM stock |
| Haemin, in DMSO (1 mM stock) | 1 μL                               | 1 μL                              | 1 μL                  | 1 μL                               |
| ddH₂O                        | 98.5 μL                            | 98.5 μL                           | 98.5 μL               | 102.25 μL                          |
| TMB (50 mM stock in DMSO)    | 1.5 μL                             | 1.5 μL                            | 1.5 μL                | 1.5 μL                             |
| H₂O₂                         | 1.5 μL                             | 1.5 μL                            | 1.5 μL                | 1.5 μL                             |
| **TOTAL**                    | **125 μL**                         | **125 μL**                        | **125 μL**            | **125 μL**                         |

## Entry [P04]
> See experiment [E1.2](/engineering#e1-2-second-generation-rca-template-treated-with-exonuclease-i)

1. Into a PCR tube, add:

|                                         | Sample 1  |
| :-------------------------------------- | :-------- |
| RCA linear template (v2) (100 µM stock) | 2 μL      |
| Linear scaffold DNA (v2) (100 µM stock) | 2 μL      |
| ddH₂O                                   | 13 μL     |
| **TOTAL**                               | **17 μL** |

2. Incubate the reaction mixture at 95°C for 5 minutes; set the thermocycler to gradually cool down to 25°C.  
3. Into the same PCR tube, add:

|                              | Sample 1  |
| :--------------------------- | :-------- |
| Reaction mixture from step 1 | 17 μL     |
| 10× T4 Ligase Buffer         | 2 μL      |
| T4 Ligase                    | 1 μL      |
| **TOTAL**                    | **20 μL** |

4. Incubate at 22°C for 15 minutes.  
5. Perform oligonucleotide purification protocol to the reaction mixture, and elute with 17 μL ddH₂O preheated at 65°C.  
6. Into a new PCR tube, add:

|                                      | Sample 1  |
| :----------------------------------- | :-------- |
| Oligonucleotide purification product | 17 μL     |
| 10× Exonuclease I reaction buffer    | 2 μL      |
| Exonuclease I                        | 1 μL      |
| **TOTAL**                            | **20 μL** |

7. Incubate at 37°C for 2 hours.  
8. Perform oligonucleotide purification protocol to the reaction mixture, and elute with 20 μL ddH₂O preheated at 65°C.  
9. Measure the sample concentration and dilute to 1 ng/μL.

## Entry [P05]
> See experiment [E1.2](/engineering#e1-2-second-generation-rca-template-treated-with-exonuclease-i)

1. Into the PCR tubes, add:

|                                   | (1) (+) With IDT primer | (2) (-) Without primer |
| :-------------------------------- | :---------------------- | :--------------------- |
| ddH₂O                             | 12 μL                   | 14 μL                  |
| rCutSmart Buffer                  | 2 μL                    | 2 μL                   |
| dNTP mix (10 mM each, stock)      | 2 μL                    | 2 μL                   |
| RCA template (v2) (1 ng/μL stock) | 1 μL                    | 1 μL                   |
| RCA primer (10 µM stock)          | 2 μL                    | -                      |
| **TOTAL**                         | **19 μL**               | **19 μL**              |

2. Incubate at 95°C for 5 minutes, and then return to ice.  
3. Add 1 μL of Φ29 DNA polymerase to each tube.  
4. Incubate at 30°C for 2 hours.  
5. Perform heat inactivation at 65°C for 10 minutes.  
6. Run 10 μL of each sample to gel electrophoresis using 0.8% Agarose/TAE gel with RedSafe.

## Entry [P06]
> See experiment [E1.3](/engineering#e1-3-third-generation-rca-template-treated-with-triton-x-100-and-exonuclease-i)

1. Into a PCR tube, add:

|                                         | Sample 1  |
| :-------------------------------------- | :-------- |
| RCA linear template (v3) (100 µM stock) | 2 μL      |
| Linear scaffold DNA (v3) (100 µM stock) | 2 μL      |
| ddH₂O                                   | 13 μL     |
| **TOTAL**                               | **17 μL** |

2. Incubate the reaction mixture at 95°C for 5 minutes; set the thermocycler to gradually cool down to 25°C.  
3. Into the same PCR tube, add:

|                              | Sample 1  |
| :--------------------------- | :-------- |
| Reaction mixture from step 1 | 17 μL     |
| 10× T4 Ligase Buffer         | 2 μL      |
| T4 Ligase                    | 1 μL      |
| **TOTAL**                    | **20 μL** |

4. Incubate at 22°C for 15 minutes.  
5. Perform oligonucleotide purification protocol to the reaction mixture, and elute with 17 μL ddH₂O preheated at 65°C.  
6. Into a new PCR tube, add:

|                                      | Sample 1  |
| :----------------------------------- | :-------- |
| Oligonucleotide purification product | 16.8 μL   |
| 10× Exonuclease I reaction buffer    | 2 μL      |
| Exonuclease I                        | 1 μL      |
| Triton X-100                         | 0.2 μL    |
| **TOTAL**                            | **20 μL** |

7. Incubate at 37°C for 2 hours.  
8. Perform oligonucleotide purification protocol to the reaction mixture, and elute with 20 μL ddH₂O preheated at 65°C.  
9. Measure the sample concentration and dilute to 1 ng/μL.

## Entry [P07]
> See experiment [E1.3](/engineering#e1-3-third-generation-rca-template-treated-with-triton-x-100-and-exonuclease-i)

1. Into the PCR tubes, add:

|                                   | (1) (+) Triton & ExoI-treated, with IDT primer | (2) (-) Triton & ExoI-treated, without primer | (3) (+) ExoI-treated, with IDT primer | (4) (-) ExoI-treated, without primer |
| :-------------------------------- | :--------------------------------------------- | :-------------------------------------------- | :------------------------------------ | :----------------------------------- |
| ddH₂O                             | 12 μL                                          | 14 μL                                         | 12 μL                                 | 14 μL                                |
| rCutSmart Buffer                  | 2 μL                                           | 2 μL                                          | 2 μL                                  | 2 μL                                 |
| dNTP mix (10 mM each, stock)      | 2 μL                                           | 2 μL                                          | 2 μL                                  | 2 μL                                 |
| RCA template (v3) (1 ng/μL stock) | 1 μL (Triton-100 and ExoI-treated)             | 1 μL (Triton-100 and ExoI-treated)            | 1 μL (ExoI-treated)                   | 1 μL (ExoI-treated)                  |
| RCA primer (10 µM stock)          | 2 μL                                           | -                                             | 2 μL                                  | -                                    |
| **TOTAL**                         | **19 μL**                                      | **19 μL**                                     | **19 μL**                             | **19 μL**                            |

2. Incubate at 95°C for 5 minutes, and then return to ice.  
3. Add 1 μL of Φ29 DNA polymerase to each tube.  
4. Incubate at 30°C for 2 hours.  
5. Perform heat inactivation at 65°C for 10 minutes.  
6. Run 10 μL of each sample to gel electrophoresis using 0.8% Agarose/TAE gel with GelGreen.

## Entry [P08]
> See experiment [E1.4](/engineering#e1-4-third-generation-rca-template-treated-with-exonuclease-i-and-iii)  
> See *[Development of Robust ssDNA Circularisation Protocol](/contribution#development-of-robust-ssdna-circularisation-protocol)*  

1. Into a PCR tube, add:

|                                         | Sample 1  |
| :-------------------------------------- | :-------- |
| RCA linear template (v3) (100 µM stock) | 2 μL      |
| Linear scaffold DNA (v3) (100 µM stock) | 2 μL      |
| ddH₂O                                   | 13 μL     |
| **TOTAL**                               | **17 μL** |

2. Incubate the reaction mixture at 95°C for 5 minutes; set the thermocycler to gradually cool down to 25°C.  
3. Into the same PCR tube, add:

|                              | Sample 1  |
| :--------------------------- | :-------- |
| Reaction mixture from step 1 | 17 μL     |
| 10× T4 Ligase Buffer         | 2 μL      |
| T4 Ligase                    | 1 μL      |
| **TOTAL**                    | **20 μL** |

4. Incubate at 22°C for 15 minutes.  
5. Perform oligonucleotide purification protocol to the reaction mixture, and elute with 18 μL ddH₂O preheated at 65°C.  
6. Into a new PCR tube, add:

|                                          | Sample 1   |
| :--------------------------------------- | :--------- |
| ddH₂O                                    | 70.5 μL    |
| Oligonucleotide purification product     | 18 μL      |
| 10× Exonuclease III buffer               | 10 μL      |
| Exonuclease III (TaKaRa Bio)             | 0.5 μL     |
| Exonuclease I (Thermo Fisher Scientific) | 1 μL       |
| **TOTAL**                                | **100 μL** |

7. Incubate at 37°C for 1 hour.  
8. Perform oligonucleotide purification protocol to the reaction mixture, and elute with 20 μL ddH₂O preheated at 65°C.  
9. Measure the sample concentration and dilute to 1 ng/μL.

## Entry [P09]
> See experiment [E1.4](/engineering#e1-4-third-generation-rca-template-treated-with-exonuclease-i-and-iii)

1. Into the PCR tubes, add:

|                                   | (1) (+) ExoI & ExoIII-treated, with IDT primer, cut with Nt.BsmAI | (2) (+) ExoI & ExoIII-treated, with IDT primer | (3) (-) ExoI & ExoIII-treated, without primer |
| :-------------------------------- | :---------------------------------------------------------------- | :--------------------------------------------- | :-------------------------------------------- |
| ddH₂O                             | 11.5 μL                                                           | 12 μL                                          | 14 μL                                         |
| rCutSmart Buffer                  | 2 μL                                                              | 2 μL                                           | 2 μL                                          |
| dNTP mix (2.5 mM each, stock)     | 2 μL                                                              | 2 μL                                           | 2 μL                                          |
| RCA template (v3) (1 ng/μL stock) | 1 μL                                                              | 1 μL                                           | 1 μL                                          |
| RCA primer (10 µM stock)          | 2 μL                                                              | 2 μL                                           | -                                             |
| **TOTAL**                         | **18.5 μL**                                                       | **19 μL**                                      | **19 μL**                                     |

2. Incubate at 95°C for 5 minutes, and then return to ice.  
3. Into the same PCR tubes, add:

|                             | (1) (+) ExoI & ExoIII-treated, with IDT primer, cut with Nt.BsmAI | (2) (+) ExoI & ExoIII-treated, with IDT primer | (3) (-) ExoI & ExoIII-treated, without primer |
| :-------------------------- | :---------------------------------------------------------------- | :--------------------------------------------- | :-------------------------------------------- |
| Product from previous steps | 18.5 μL                                                           | 19 μL                                          | 19 μL                                         |
| Φ29 DNA polymerase          | 1 μL                                                              | 1 μL                                           | 1 μL                                          |
| Nt.BsmAI                    | 0.5 μL                                                            | -                                              | -                                             |
| **TOTAL**                   | **20 μL**                                                         | **20 μL**                                      | **20 μL**                                     |

4. Incubate at 37°C for 2 hours.  
5. Perform heat inactivation at 65°C for 20 minutes.  
6. Run 10 μL of each sample to gel electrophoresis using 0.8% Agarose/TAE gel with GelGreen.

## Entry [P10]
> See experiment [E1.4](/engineering#e1-4-third-generation-rca-template-treated-with-exonuclease-i-and-iii)

1. Into each PCR tube, add:

|                              | (1) (+) ExoI & ExoIII-treated, with IDT primer, cut with Nt.BsmAI | (2) (+) ExoI & ExoIII-treated, with IDT primer | (3) (-) ExoI & ExoIII-treated, without primer | (+) control, from IDT G-quad 8 µM stock |
| :--------------------------- | :---------------------------------------------------------------- | :--------------------------------------------- | :-------------------------------------------- | :-------------------------------------- |
| 10× G-quadruplex buffer      | 12.5 μL                                                           | 12.5 μL                                        | 12.5 μL                                       | 12.5 μL                                 |
| G-quadruplex sample          | 10 μL                                                             | 10 μL                                          | 10 μL                                         | 6.25 μL                                 |
| Haemin, in DMSO (1 mM stock) | 1 μL                                                              | 1 μL                                           | 1 μL                                          | 1 μL                                    |
| ddH₂O                        | 98.5 μL                                                           | 98.5 μL                                        | 98.5 μL                                       | 102.25 μL                               |
| TMB (50 mM stock in DMSO)    | 1.5 μL                                                            | 1.5 μL                                         | 1.5 μL                                        | 1.5 μL                                  |
| H₂O₂                         | 1.5 μL                                                            | 1.5 μL                                         | 1.5 μL                                        | 1.5 μL                                  |
| **TOTAL**                    | **125 μL**                                                        | **125 μL**                                     | **125 μL**                                    | **125 μL**                              |


## Entry [P11]
> See experiment [E2.1](/engineering#e2-1-dna-cleaving-dnazymes-test)

1. Into each centrifuge tube, add:

|                                 | Sample 1                             |
| :------------------------------ | :----------------------------------- |
| DNA-cleaving DNAzymes 1 and 2   | 2 µM each                            |
| 10× DNA-cleaving DNAzyme buffer | 5 μL                                 |
| ddH₂O                           | top up until (50 μL - test fragment) |
| **TOTAL**                       | **(50 μL - test fragment)**          |

2. Incubate at 95°C for 5 minutes, followed by gradual cooling down to 25°C over 15 minutes.  
3. Into the centrifuge tube, add:

|                                         | Sample 1                |
| :-------------------------------------- | :---------------------- |
| Products from step 2                    | (50 μL - test fragment) |
| Test fragment (simulating RCA products) | 5 nM                    |
| **TOTAL**                               | **50 μL**               |

4. Incubate at room temperature for 40 minutes.  
5. Run the sample to gel electrophoresis using 5% Agarose/TAE gel with GelGreen.

## Entry [P12]
> See experiment [E2.2](/engineering#e2-2-first-generation-rca-in-rcutsmart-buffer)

1. Into a PCR tube, add:

|                                         | Sample 1  |
| :-------------------------------------- | :-------- |
| RCA linear template (v1) (100 µM stock) | 2 μL      |
| Linear scaffold DNA (v1) (100 µM stock) | 2 μL      |
| ddH₂O                                   | 13 μL     |
| **TOTAL**                               | **17 μL** |

2. Incubate the reaction mixture at 95°C for 5 minutes; set the thermocycler to gradually cool down to 25°C.  
3. Into the same PCR tube, add:

|                              | Sample 1  |
| :--------------------------- | :-------- |
| Reaction mixture from step 1 | 17 μL     |
| 10× T4 Ligase Buffer         | 2 μL      |
| T4 Ligase                    | 1 μL      |
| **TOTAL**                    | **20 μL** |

4. Incubate at 22°C for 15 minutes.  
5. Perform oligonucleotide purification protocol to the reaction mixture, and elute with 17 μL ddH₂O preheated at 65°C.  
6. Into a new PCR tube, add:

|                                      | Sample 1  |
| :----------------------------------- | :-------- |
| Oligonucleotide purification product | 17 μL     |
| 10× Exonuclease I reaction buffer    | 2 μL      |
| Exonuclease I                        | 1 μL      |
| **TOTAL**                            | **20 μL** |

7. Incubate at 37°C for 2 hours.  
8. Perform oligonucleotide purification protocol to the reaction mixture, and elute with 20 μL ddH₂O preheated at 65°C.  
9. Measure the sample concentration and dilute to 1 ng/μL.

## Entry [P13]
> See experiment [E2.2](/engineering#e2-2-first-generation-rca-in-rcutsmart-buffer)

1. Into the PCR tube, add:

|                                   | Sample 1  |
| :-------------------------------- | :-------- |
| ddH₂O                             | 11.4 μL   |
| rCutSmart Buffer                  | 2 μL      |
| dNTP mix (10 mM each, stock)      | 2 μL      |
| RCA template (v1) (1 ng/μL stock) | 1 μL      |
| RCA primer (10 µM stock)          | 2 μL      |
| DTT (0.1 M stock)                 | 0.6 μL    |
| **TOTAL**                         | **19 μL** |

2. Incubate at 95°C for 5 minutes, and then return to ice.  
3. Add 1 μL of Φ29 DNA polymerase to each tube.  
4. Incubate at 30°C for 2 hours.  
5. Perform heat inactivation at 65°C for 10 minutes.  
6. Run 10 μL of the sample to gel electrophoresis using 0.8% Agarose/TAE gel with GelGreen.

## Entry [P14]
> See experiment [E2.2](/engineering#e2-2-first-generation-rca-in-rcutsmart-buffer)

1. Into each PCR tube, add:

|                              | (+) RCA-generated G-quadruplex | (+) IDT-synthesised G-quadruplex with DTT | (+) IDT-synthesised G-quadruplex |
| :--------------------------- | :----------------------------- | :---------------------------------------- | :------------------------------- |
| 10× G-quadruplex buffer      | 25 μL                          | 25 μL                                     | 25 μL                            |
| G-quadruplex sample          | 10 μL                          | 12.5 μL                                   | 12.5 μL                          |
| DTT (0.1 M stock)            | -                              | 0.6 μL                                    | -                                |
| Haemin, in DMSO (1 mM stock) | 2 μL                           | 2 μL                                      | 2 μL                             |
| ddH₂O                        | 207 μL                         | 203.9 μL                                  | 204.5 μL                         |
| TMB (50 mM stock in DMSO)    | 3 μL                           | 3 μL                                      | 3 μL                             |
| H₂O₂                         | 3 μL                           | 3 μL                                      | 3 μL                             |
| **TOTAL**                    | **250 μL**                     | **250 μL**                                | **250  μL**                      |


## Entry [P15]
> See experiment [E2.3](/engineering#e2-3-first-generation-rca-in-rcutsmart-buffer-without-dtt)

1. Into a PCR tube, add:

|                                         | Sample 1  |
| :-------------------------------------- | :-------- |
| RCA linear template (v1) (100 µM stock) | 2 μL      |
| Linear scaffold DNA (v1) (100 µM stock) | 2 μL      |
| ddH₂O                                   | 13 μL     |
| **TOTAL**                               | **17 μL** |

2. Incubate the reaction mixture at 95°C for 5 minutes; set the thermocycler to gradually cool down to 25°C.  
3. Into the same PCR tube, add:

|                              | Sample 1  |
| :--------------------------- | :-------- |
| Reaction mixture from step 1 | 17 μL     |
| 10× T4 Ligase Buffer         | 2 μL      |
| T4 Ligase                    | 1 μL      |
| **TOTAL**                    | **20 μL** |

4. Incubate at 22°C for 15 minutes.  
5. Perform oligonucleotide purification protocol to the reaction mixture, and elute with 17 μL ddH₂O preheated at 65°C.  
6. Into a new PCR tube, add:

|                                      | Sample 1  |
| :----------------------------------- | :-------- |
| Oligonucleotide purification product | 17 μL     |
| 10× Exonuclease I reaction buffer    | 2 μL      |
| Exonuclease I                        | 1 μL      |
| **TOTAL**                            | **20 μL** |

7. Incubate at 37°C for 2 hours.  
8. Perform oligonucleotide purification protocol to the reaction mixture, and elute with 20 μL ddH₂O preheated at 65°C.  
9. Measure the sample concentration and dilute to 1 ng/μL.

## Entry [P16]
> See experiment [E2.3](/engineering#e2-3-first-generation-rca-in-rcutsmart-buffer-without-dtt)

1. Into the PCR tubes, add:

|                                   | (1) (+) With IDT primer | (2) (-) Without primer |
| :-------------------------------- | :---------------------- | :--------------------- |
| ddH₂O                             | 12 μL                   | 14 μL                  |
| rCutSmart Buffer                  | 2 μL                    | 2 μL                   |
| dNTP mix (10 mM each, stock)      | 2 μL                    | 2 μL                   |
| RCA template (v1) (1 ng/μL stock) | 1 μL                    | 1 μL                   |
| RCA primer (10 µM stock)          | 2 μL                    | -                      |
| **TOTAL**                         | **19 μL**               | **19 μL**              |

2. Incubate at 95°C for 5 minutes, and then return to ice.  
3. Add 1 μL of Φ29 DNA polymerase to each tube.  
4. Incubate at 30°C for 2 hours.  
5. Perform heat inactivation at 65°C for 10 minutes.  
6. Run 10 μL of each sample to gel electrophoresis using 0.8% Agarose/TAE gel with GelGreen.

## Entry [P17]
> See experiment [E2.3](/engineering#e2-3-first-generation-rca-in-rcutsmart-buffer-without-dtt)

1. Into each PCR tube, add:

|                              | (1) (+) RCA-generated G-quadruplex | (2) (-) false positive RCA result |
| :--------------------------- | :--------------------------------- | :-------------------------------- |
| 10× G-quadruplex buffer      | 12.5 μL                            | 12.5 μL                           |
| G-quadruplex sample          | 10 μL from (1) (+) With IDT primer | 10 μL from (2) (-) Without primer |
| Haemin, in DMSO (1 mM stock) | 1 μL                               | 1 μL                              |
| ddH₂O                        | 98.5 μL                            | 98.5 μL                           |
| TMB (50 mM stock in DMSO)    | 1.5 μL                             | 1.5 μL                            |
| H₂O₂                         | 1.5 μL                             | 1.5 μL                            |
| **TOTAL**                    | **125 μL**                         | **125 μL**                        |


## Entry [P18]
> See experiment [E2.4](/engineering#e2-4-g-quadruplex-concentration-and-signal-expression-correlation)

1. Into each PCR tube, add:

|                                                  | (1)        | (2)        | (3) control | (4)        |
| :----------------------------------------------- | :--------- | :--------- | :---------- | :--------- |
| 10× G-quadruplex buffer                          | 12.5 μL    | 12.5 μL    | 12.5 μL     | 12.5 μL    |
| G-quadruplex sample (from IDT G-quad 8 µM stock) | 18.75 μL   | 12.5 μL    | 6.25 μL     | 0.625 μL   |
| Haemin, in DMSO (1 mM stock)                     | 1 μL       | 1 μL       | 1 μL        | 1 μL       |
| ddH₂O                                            | 89.75 μL   | 96 μL      | 102.25 μL   | 107.875 μL |
| TMB (50 mM stock in DMSO)                        | 1.5 μL     | 1.5 μL     | 1.5 μL      | 1.5 μL     |
| H₂O₂                                             | 1.5 μL     | 1.5 μL     | 1.5 μL      | 1.5 μL     |
| **TOTAL**                                        | **125 μL** | **125 μL** | **125 μL**  | **125 μL** |

## Entry [P19]
> See experiment [E2.5](/engineering#e2-5-third-generation-rca-without-exonuclease-i-treatment)

1. Into a PCR tube, add:

|                                         | Sample 1  |
| :-------------------------------------- | :-------- |
| RCA linear template (v3) (100 µM stock) | 2 μL      |
| Linear scaffold DNA (v3) (100 µM stock) | 2 μL      |
| ddH₂O                                   | 13 μL     |
| **TOTAL**                               | **17 μL** |

2. Incubate the reaction mixture at 95°C for 5 minutes; set the thermocycler to gradually cool down to 25°C.  
3. Into the same PCR tube, add:

|                              | Sample 1  |
| :--------------------------- | :-------- |
| Reaction mixture from step 1 | 17 μL     |
| 10× T4 Ligase Buffer         | 2 μL      |
| T4 Ligase                    | 1 μL      |
| **TOTAL**                    | **20 μL** |

4. Incubate at 22°C for 15 minutes.  
5. Perform oligonucleotide purification protocol to the reaction mixture, and elute with 20 μL ddH₂O preheated at 65°C.

## Entry [P20]
> See experiment [E2.5](/engineering#e2-5-third-generation-rca-without-exonuclease-i-treatment)

1. Into the PCR tubes, add:

|                                   | (1) RCA (v3) cut with Nt.BsmAI | (2) RCA (v3) uncut |
| :-------------------------------- | :----------------------------- | :----------------- |
| ddH₂O                             | 11.5 μL                        | 12 μL              |
| rCutSmart Buffer                  | 2 μL                           | 2 μL               |
| dNTP mix (2.5 mM each, stock)     | 2 μL                           | 2 μL               |
| RCA template (v3) (1 ng/μL stock) | 1 μL                           | 1 μL               |
| RCA primer (10 µM stock)          | 2 μL                           | 2 μL               |
| **TOTAL**                         | **18.5 μL**                    | **19 μL**          |

2. Incubate at 95°C for 5 minutes, and then return to ice.  
3. Into the same PCR tubes, add:

|                             | (1) RCA (v3) cut with Nt.BsmAI | (2) RCA (v3) uncut |
| :-------------------------- | :----------------------------- | :----------------- |
| Product from previous steps | 18.5 μL                        | 19 μL              |
| Φ29 DNA polymerase          | 1 μL                           | 1 μL               |
| Nt.BsmAI                    | 0.5 μL                         | -                  |
| **TOTAL**                   | **20 μL**                      | **20 μL**          |

4. Incubate at 37°C for 2 hours.  
5. Perform heat inactivation at 65°C for 20 minutes.  
6. Run 10 μL of each sample to gel electrophoresis using 0.8% Agarose/TAE gel with GelGreen.

## Entry [P21]
> See experiment [E2.5](/engineering#e2-5-third-generation-rca-without-exonuclease-i-treatment)

1. Into each PCR tube, add:

|                              | (1) RCA(v3)/Nt.BsmAI-GQuad | (2) RCA(v3)-GQuad | (+) control |
| :--------------------------- | :------------------------- | :---------------- | :---------- |
| 10× G-quadruplex buffer      | 12.5 μL                    | 12.5 μL           | 12.5 μL     |
| G-quadruplex sample          | 10 μL                      | 10 μL             | 6.25 μL     |
| Haemin, in DMSO (1 mM stock) | 1 μL                       | 1 μL              | 1 μL        |
| ddH₂O                        | 98.5 μL                    | 98.5 μL           | 102.25 μL   |
| TMB (50 mM stock in DMSO)    | 1.5 μL                     | 1.5 μL            | 1.5 μL      |
| H₂O₂                         | 1.5 μL                     | 1.5 μL            | 1.5 μL      |
| **TOTAL**                    | **125 μL**                 | **125 μL**        | **125 μL**  |


## Entry [P22]
> See experiment [E2.6](/engineering#e2-6-third-generation-with-different-template-concentrations)  
> See *[Third-Generation RCA](/results#third-generation-rca)*  

10. Into a PCR tube, add:

|                                         | Sample 1  |
| :-------------------------------------- | :-------- |
| RCA linear template (v3) (100 µM stock) | 2 μL      |
| Linear scaffold DNA (v3) (100 µM stock) | 2 μL      |
| ddH₂O                                   | 13 μL     |
| **TOTAL**                               | **17 μL** |

11. Incubate the reaction mixture at 95°C for 5 minutes; set the thermocycler to gradually cool down to 25°C.  
12. Into the same PCR tube, add:

|                              | Sample 1  |
| :--------------------------- | :-------- |
| Reaction mixture from step 1 | 17 μL     |
| 10× T4 Ligase Buffer         | 2 μL      |
| T4 Ligase                    | 1 μL      |
| **TOTAL**                    | **20 μL** |

13. Incubate at 22°C for 15 minutes.  
14. Perform oligonucleotide purification protocol to the reaction mixture, and elute with 18 μL ddH₂O preheated at 65°C.  
15. Into a new PCR tube, add:

|                                          | Sample 1   |
| :--------------------------------------- | :--------- |
| ddH₂O                                    | 70.5 μL    |
| Oligonucleotide purification product     | 18 μL      |
| 10× Exonuclease III buffer               | 10 μL      |
| Exonuclease III (TaKaRa Bio)             | 0.5 μL     |
| Exonuclease I (Thermo Fisher Scientific) | 1 μL       |
| **TOTAL**                                | **100 μL** |

16. Incubate at 37°C for 1 hour.  
17. Perform oligonucleotide purification protocol to the reaction mixture, and elute with 20 μL ddH₂O preheated at 65°C.  
18. Measure the sample concentration and dilute to 1 ng/μL.

## Entry [P23]
> See experiment [E2.6](/engineering#e2-6-third-generation-with-different-template-concentrations)  
> See *[Third-Generation RCA](/results#third-generation-rca)*  

1. Into the PCR tubes, add:

|                                   | (1) 1 ng    | (2) 2 ng    | (3) 4 ng    | (4) 8 ng    | (5) uncut | (6) (-)   |
| :-------------------------------- | :---------- | :---------- | :---------- | :---------- | :-------- | :-------- |
| ddH₂O                             | 11.5 μL     | 10.5 μL     | 8.5 μL      | 4.5 μL      | 12 μL     | 14 μL     |
| rCutSmart Buffer                  | 2 μL        | 2 μL        | 2 μL        | 2 μL        | 2 μL      | 2 μL      |
| dNTP mix (10 mM each, stock)      | 2 μL        | 2 μL        | 2 μL        | 2 μL        | 2 μL      | 2 μL      |
| RCA template (v3) (1 ng/μL stock) | 1 μL        | 2 μL        | 4 μL        | 8 μL        | 1 μL      | 1 μL      |
| RCA primer (10 µM stock)          | 2 μL        | 2 μL        | 2 μL        | 2 μL        | 2 μL      | -         |
| **TOTAL**                         | **18.5 μL** | **18.5 μL** | **18.5 μL** | **18.5 μL** | **19 μL** | **19 μL** |

2. Incubate at 95°C for 5 minutes, and then return to ice.  
3. Into the same PCR tubes, add:

|                             | (1) 1 ng  | (2) 2 ng  | (3) 4 ng  | (4) 8 ng  | (5) uncut | (6) (-)   |
| :-------------------------- | :-------- | :-------- | :-------- | :-------- | :-------- | :-------- |
| Product from previous steps | 18.5 μL   | 18.5 μL   | 18.5 μL   | 18.5 μL   | 19 μL     | 19 μL     |
| Φ29 DNA polymerase          | 1 μL      | 1 μL      | 1 μL      | 1 μL      | 1 μL      | 1 μL      |
| Nt.BsmAI                    | 0.5 μL    | 0.5 μL    | 0.5 μL    | 0.5 μL    | -         | -         |
| **TOTAL**                   | **20 μL** | **20 μL** | **20 μL** | **20 μL** | **20 μL** | **20 μL** |

4. Incubate at 37°C for 2 hours.  
5. Perform heat inactivation at 65°C for 20 minutes.  
6. Run 10 μL of each sample to gel electrophoresis using 0.8% Agarose/TAE gel with GelGreen.

## Entry [P24]
> See experiment [E2.6](/engineering#e2-6-third-generation-with-different-template-concentrations)  
> See *[Signal Expression: G-Quadruplex DNAzyme Assay](/results#signal-expression-g-quadruplex-dnazyme-assay)*  

1. Into each PCR tube, add:

|                              | (1) 1 ng   | (2) 2 ng   | (3) 4 ng   | (4) 8 ng   | (5) uncut  | (6) (-)    | (7) (+) control |
| :--------------------------- | :--------- | :--------- | :--------- | :--------- | :--------- | :--------- | :-------------- |
| 10× G-quadruplex buffer      | 12.5 μL    | 12.5 μL    | 12.5 μL    | 12.5 μL    | 12.5 μL    | 12.5 μL    | 12.5 μL         |
| G-quadruplex sample          | 10 μL      | 10 μL      | 10 μL      | 10 μL      | 10 μL      | 10 μL      | 6.25 μL         |
| Haemin, in DMSO (1 mM stock) | 1 μL       | 1 μL       | 1 μL       | 1 μL       | 1 μL       | 1 μL       | 1 μL            |
| ddH₂O                        | 98.5 μL    | 98.5 μL    | 98.5 μL    | 98.5 μL    | 98.5 μL    | 98.5 μL    | 102.25 μL       |
| TMB (50 mM stock in DMSO)    | 1.5 μL     | 1.5 μL     | 1.5 μL     | 1.5 μL     | 1.5 μL     | 1.5 μL     | 1.5 μL          |
| H₂O₂                         | 1.5 μL     | 1.5 μL     | 1.5 μL     | 1.5 μL     | 1.5 μL     | 1.5 μL     | 1.5 μL          |
| **TOTAL**                    | **125 μL** | **125 μL** | **125 μL** | **125 μL** | **125 μL** | **125 μL** | **125 μL**      |

## Entry [P25]
> See *[Cell Lysis: SDS Treatment](/results#cell-lysis-sds-treatment)*

1. Into each PCR tube, add:

|                          | SDS-Treated | Control (Untreated) |
| :----------------------- | :---------- | :------------------ |
| Cell culture             | 50 μL       | 50 μL               |
| 1× SDS                   | 50 μL       | -                   |
| 1× Neutralisation buffer | 75 μL       | -                   |
| ddH₂O                    | -           | 125 μL              |
| **TOTAL**                | **175 μL**  | **175 μL**          |

2. Mix all tubes by flicking.  
3. Spin down in a microcentrifuge for 2 minutes.  
4. Mix 50 μL of each sample of cell culture with 50 μL of glycerol.  
5. Add 3 μL of each sample from step (4) on a microscope slide.  
6. Secure the cover slip on top of the microscope slide and observe the cells under the microscope.

## Entry [P26]
> See *[Target Gene Extraction: Nt.BsmAI/HhaI-LSDA](/results#target-gene-extraction-nt-bsmai-hhai-lsda)*

1. Into each PCR tube, add:

|                                 | Nt.BsmAI & HhaI | HhaI      |
| :------------------------------ | :-------------- | :-------- |
| ddH₂O                           | 0.32 μL         | 0.66 μL   |
| rCutSmart Buffer                | 2 μL            | 2 μL      |
| Nt.BsmAI                        | 0.34 μL         | -         |
| HhaI                            | 0.34 μL         | 0.34 μL   |
| pSB1C3-KPC-2 (68.4 ng/μL stock) | 14 μL           | 14 μL     |
| **TOTAL**                       | **17 μL**       | **17 μL** |

2. Incubate at 37°C for 45 minutes.  
3. Into the same PCR tubes, add:

|                      | Nt.BsmAI & HhaI | HhaI      |
| :------------------- | :-------------- | :-------- |
| Sample from step (2) | 17 μL           | 17 μL     |
| Φ29 DNA polymerase   | 1 μL            | 1 μL      |
| dNTP                 | 2 μL            | 2 μL      |
| **TOTAL**            | **20 μL**       | **20 μL** |

4. Incubate at 30°C for 15 minutes.  
5. Perform heat inactivation at 65°C for 20 minutes.  
6. Run 10 μL of each sample to gel electrophoresis using 5% Agarose/TAE gel with GelGreen.

## Entry [P27]
> See *[RCA in rCutSmart](/results#rca-in-rcutsmart)*

1. Into a PCR tube, add:

|                                         | Sample 1  |
| :-------------------------------------- | :-------- |
| RCA linear template (v1) (100 µM stock) | 2 μL      |
| Linear scaffold DNA (v1) (100 µM stock) | 2 μL      |
| ddH₂O                                   | 13 μL     |
| **TOTAL**                               | **17 μL** |

2. Incubate the reaction mixture at 95°C for 5 minutes; set the thermocycler to gradually cool down to 25°C.  
3. Into the same PCR tube, add:

|                              | Sample 1  |
| :--------------------------- | :-------- |
| Reaction mixture from step 1 | 17 μL     |
| 10× T4 Ligase Buffer         | 2 μL      |
| T4 Ligase                    | 1 μL      |
| **TOTAL**                    | **20 μL** |

4. Incubate at 22°C for 15 minutes.  
5. Perform oligonucleotide purification protocol to the reaction mixture, and elute with 17 μL ddH₂O preheated at 65°C.  
6. Into a new PCR tube, add:

|                                      | Sample 1  |
| :----------------------------------- | :-------- |
| Oligonucleotide purification product | 17 μL     |
| 10× Exonuclease I reaction buffer    | 2 μL      |
| Exonuclease I                        | 1 μL      |
| **TOTAL**                            | **20 μL** |

7. Incubate at 37°C for 2 hours.  
8. Perform oligonucleotide purification protocol to the reaction mixture, and elute with 20 μL ddH₂O preheated at 65°C.  
9. Measure the sample concentration and dilute to 1 ng/μL.

## Entry [P28]
> See *[RCA in rCutSmart](/results#rca-in-rcutsmart)*

1. Into the PCR tubes, add:

|                                   | 10× Reaction Buffer | rCutSmart Buffer |
| :-------------------------------- | :------------------ | :--------------- |
| ddH₂O                             | 11.4 μL             | 13.4 μL          |
| Buffer                            | 2 μL                | 2 μL             |
| dNTP mix (10 mM each, stock)      | 2 μL                | 2 μL             |
| RCA template (v1) (1 ng/μL stock) | 1 μL                | 1 μL             |
| RCA primer (10 µM stock)          | 2 μL                | -                |
| DTT (0.1 M stock)                 | 0.6 μL              | 0.6 μL           |
| **TOTAL**                         | **19 μL**           | **19 μL**        |

2. Incubate at 95°C for 5 minutes, and then return to ice.  
3. Add 1 μL of Φ29 DNA polymerase to each tube.  
4. Incubate at 30°C for 2 hours.  
5. Perform heat inactivation at 65°C for 10 minutes.  
6. Run 10 μL of each sample to gel electrophoresis using 0.8% Agarose/TAE gel with GelGreen.

# Buffer Preparation Protocols

## G-Quadruplex Buffer Preparation (10×) (in 1L)


| Reagent      | Quantity                       |
| :----------- | :----------------------------- |
| Tris         | 0.1 M (100 mL of 1M Tris)      |
| Triton X-100 | 0.5% (5 mL of 1M Triton X-100) |
| DMSO         | 10% (100 mL of 1M DMSO)        |
| KCl          | 1 M (500 mL of 2M KCl)         |
| ddH₂O        | Variable                       |
| HCl          | Variable                       |

1. Mix the first 4 components as per the final concentrations listed in the table.  
2. Top up to 800 mL using ddH₂O.  
3. Adjust to pH 7.5 with HCl.  
4. Top up to 1000 mL using ddH₂O.

## 13PD1 DNAzyme Buffer (1×) (in 1L)

| Reagent | Quantity                    |
| :------ | :-------------------------- |
| ZnCl₂   | 0.01 M (10 mL of 1 M ZnCl₂) |
| MnCl₂   | 0.2 M (200 mL of 1 M MnCl₂) |
| MgCl₂   | 0.1 M (100 mL of 1 M MgCl₂) |
| NaCl    | 0.375 M (75 mL of 5 M NaCl) |
| MOPS    | 0.1 M (100 mL of 1 M MOPS)  |
| ddH₂O   | Variable                    |
| NaOH    | Variable                    |

1. Mix the first 5 components as per the final concentrations listed in the table.  
2. Top up to 800 mL using ddH₂O.  
3. Adjust to pH 7.5 with NaOH.