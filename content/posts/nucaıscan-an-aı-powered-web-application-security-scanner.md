---
draft: false
author: Onurcan Genç
title: "NucAIScan: An AI-Powered Web Application Security Scanner"
date: 2025-09-07T22:15:00.000+03:00
description: Onurcan Genç · ~9 min read
thumbnail: /uploads/1_ds4n30jet2uuojdzhqdd_a.webp
tags:
  - Cybersecurity
  - Project
  - OffensiveSecurity
categories:
  - Cybersecurity
  - Tools
---
Hello everyone! About a week ago, I started working on a new idea that turned into a project I now call **NucAIScan**. Initially, I had no plans to build anything related to offensive security or cyber threat intelligence since my main focus was preparing for the **eWPTX exam**. But sometimes, inspiration shows up when you least expect it.  

During a holiday break, a bug bounty friend of mine said:  

> “If we could automate scanners like Acunetix for large scopes, we could literally earn rewards just by running them and submitting the results.”  

He wasn’t wrong. He had already earned around $5,000 through this hybrid approach. That made me think:  
- Could I create a scanner that isn’t just fast, but actually smarter?  
- Could AI reduce the noise traditional tools often produce?  
- Could this pipeline serve not only bug bounty hunters, but also pentesters and researchers?  

That conversation sparked what later became **NucAIScan**.  

---

## How NucAIScan Works (High-Level)  
At a glance, the pipeline follows these steps:  

1. **Recon:** Subfinder collects subdomains, httpx checks which ones are alive, and Subzy tests for takeover risks.  
2. **Endpoint Discovery:** FFUF fuzzes hidden paths and filters out noise using a warm-up phase and word-count clustering.  
3. **AI-Driven Template Selection:** Signals from headers, body content, and paths are fed to an AI that narrows down the most relevant Nuclei templates.  
4. **Scanning:** Nuclei runs with those templates, with “exposures” included as a fallback.  
5. **Reporting:** Results are compiled into a color-coded HTML report (critical = red, high = orange, low = green).  

So the flow is basically:  
**Recon → Discovery → AI Selection → Scan → Report**  

---

## Engineering the Tool  
I didn’t want NucAIScan to be “just another script.” I designed it to be **modular, extensible, and maintainable**, following principles like single responsibility and separation of concerns.  

**Key modules include:**  
- `SubdomainScanner` → Handles discovery (Subfinder, httpx, Subzy).  
- `FFUFScanner` → Performs fuzzing and noise reduction.  
- `NucleiScanner` → Executes scans with both manual and AI-selected templates.  
- `AISelector` → Decides which templates are most relevant.  
- `ReportGenerator` → Produces clean HTML reports.  
- `Logger & Utils` → Core utilities for consistent handling.  

This modularity ensures changes in one area don’t break the others.  

---

## Features in Action  
- **Smart Recon:** Subfinder + httpx + Subzy in under 10 seconds.  
- **Noise Reduction:** Warm-up runs detect junk responses, and clustering filters duplicates.  
- **AI Template Selection:** Instead of brute forcing thousands of Nuclei templates, AI narrows it down.  
- **Fallback Safety:** Exposures/ templates are always included as backup.  
- **Clean Reports:** Easy-to-read HTML output, color-coded by severity.  

---

## Usage Examples  

### Full Scan
```bash
python -m ffufai target.com
```

### Backend Override (PHP only)
```bash
python -m ffufai target.com --backend php
```

### AI Mode
```bash
python -m ffufai target.com --ai
```

### Backend + AI Combined
```bash
python -m ffufai target.com --backend wordpress --ai
```

---

## Lessons Learned  
Building NucAIScan was more challenging than simply chaining tools together. Some lessons:  
- **Subprocess handling** across multiple tools was tricky.  
- **JSON parsing issues** required fallback logic.  
- **AI sanitization:** OpenAI outputs weren’t always clean JSON, so validation was required.  
- **Concurrency control:** Early versions spawned too many workers; limiting to 5 gave the best balance.  
- **Ethics:** I limited tests to my own domains and safe scopes.  

---

## What’s Next  
- Smarter AI triage (false-positive reduction & severity scoring).  
- Docker support for easier deployment.  
- ElasticSearch integration for centralized result storage.  

Source code: [GitHub - onurcangnc/NucAIScan](https://github.com/onurcangnc/NucAIScan)  

---

## Conclusion  
For me, NucAIScan became more than just a technical exercise. What started as a holiday chat turned into a tool I now use in my own workflows. It’s not meant to replace large commercial scanners, but rather serve as a lightweight companion for pentesters, researchers, and bug bounty hunters.  

If you try it out, I’d love to hear your feedback. Thanks for joining me on this experiment of blending **AI with offensive security**.  

**May the Pentest Be With You! 🚀**  
