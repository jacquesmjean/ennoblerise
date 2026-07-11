export type ContractInput = {
  contractType: 'nda' | 'partner' | 'third_party' | 'scholarship';
  counterparty: string;
  counterpartyEmail: string;
  country: string;
  effectiveDate: string;
  term: string;
  scope: string;
  amount: string;
};

const ORG = 'EnnobleRise Global Trust™';
const NOTICE =
  '_This template is provided for convenience and does not constitute legal advice. Have final agreements reviewed by qualified counsel in the relevant jurisdiction._';

export const contractTypeNames: Record<ContractInput['contractType'], string> = {
  nda: 'Mutual Non-Disclosure Agreement',
  partner: 'Partnership Agreement',
  third_party: 'Standard Services Agreement (Third Party)',
  scholarship: 'Scholarship Award Agreement',
};

export function composeContract(input: ContractInput): { title: string; content: string } {
  const date = input.effectiveDate || '[EFFECTIVE DATE]';
  const cp = input.counterparty || '[COUNTERPARTY]';
  const term = input.term || 'one (1) year';
  const jurisdiction = input.country || '[JURISDICTION]';
  const title = `${contractTypeNames[input.contractType]} — ${cp}`;

  const header = `# ${contractTypeNames[input.contractType]}

**Between:** ${ORG} ("the Trust")
**And:** ${cp} ("the Counterparty")${input.counterpartyEmail ? ` · ${input.counterpartyEmail}` : ''}
**Effective Date:** ${date}
**Governing Jurisdiction:** ${jurisdiction}

`;

  let body = '';
  switch (input.contractType) {
    case 'nda':
      body = `## 1. Purpose
The parties wish to explore a potential collaboration relating to: ${input.scope || 'programs of the Trust'} (the "Purpose"), and may disclose confidential information to each other in connection with it.

## 2. Confidential Information
"Confidential Information" means any non-public information disclosed by either party — including program designs, curricula, donor and beneficiary information, financial data, and strategic plans — whether marked confidential or reasonably understood to be so.

## 3. Obligations
Each party shall: (a) use Confidential Information solely for the Purpose; (b) protect it with at least the care used for its own confidential information, and no less than reasonable care; (c) not disclose it to any third party without prior written consent, except to personnel with a need to know who are bound by equivalent obligations.

## 4. Exclusions
Obligations do not apply to information that is or becomes public through no fault of the recipient, was lawfully known before disclosure, is independently developed, or must be disclosed by law (with prompt notice where permitted).

## 5. Beneficiary Data
Any information relating to program participants — many of whom are youth, women, or educators in vulnerable circumstances — shall be treated with the highest standard of care and used only as strictly required for the Purpose.

## 6. Term
This Agreement remains in effect for ${term} from the Effective Date; confidentiality obligations survive for three (3) years after termination.

## 7. General
No license or partnership is created by this Agreement. Neither party may assign it without consent. It is the entire agreement on this subject and may be amended only in writing.`;
      break;

    case 'partner':
      body = `## 1. Purpose and Spirit
The Trust and the Counterparty enter this Partnership to advance the Trust's mission — ennobling youth, educators, and women through emotional resilience, financial independence, and mindful leadership — in the spirit of public-private-community partnership. Scope of collaboration: ${input.scope || '[SCOPE OF COLLABORATION]'}.

## 2. Roles and Responsibilities
**The Trust shall:** provide program frameworks, curricula, training of ambassadors and facilitators, brand guidance, and program oversight.
**The Partner shall:** ${input.scope ? 'support the scope above with' : 'provide'} local coordination, facilities or access to communities as agreed, and uphold the values of the Trust — Humane Leadership, Mindful Growth, Resilience and Ennoblement, Purpose-Driven Innovation, Shared Prosperity, Peace and Justice, and Stewardship of People and Planet.

## 3. Brand and Intellectual Property
Program materials, marks (including "EnnobleRise" and "Ennobling for Success"), and curricula remain the property of the Trust. The Partner may use them solely for the collaboration, with attribution, and subject to the Trust's brand guidance.

## 4. Funding and Resources
${input.amount ? `The parties anticipate resources of $${Number(input.amount).toLocaleString()} for this collaboration, applied as mutually agreed in writing.` : 'Any funding, in-kind support, or cost-sharing shall be documented in writing as annexes to this Agreement.'} Each party bears its own costs unless otherwise agreed.

## 5. Safeguarding
Both parties commit to the safety, dignity, and well-being of all program participants, including compliance with applicable child-protection and safeguarding standards, and shall immediately report any concern.

## 6. Term and Termination
This Agreement runs for ${term} from the Effective Date and renews by mutual written consent. Either party may terminate with sixty (60) days' written notice; obligations of safeguarding, confidentiality, and IP survive termination.

## 7. Relationship
The parties are independent; nothing here creates an employment, agency, or joint-venture relationship. Disputes shall first be addressed through good-faith dialogue between principals.`;
      break;

    case 'third_party':
      body = `## 1. Services
The Counterparty shall provide the following services to the Trust: ${input.scope || '[DESCRIPTION OF SERVICES]'} (the "Services"), performing them with professional skill, care, and diligence.

## 2. Compensation
${input.amount ? `The Trust shall pay $${Number(input.amount).toLocaleString()} for the Services` : 'Compensation shall be as set out in the attached statement of work'}, payable upon satisfactory completion of agreed milestones and receipt of invoice. The Counterparty is responsible for its own taxes.

## 3. Term
This Agreement runs for ${term} from the Effective Date, unless terminated earlier under Section 6.

## 4. Independent Contractor
The Counterparty is an independent contractor, not an employee or agent of the Trust, and shall not represent otherwise.

## 5. Work Product and Confidentiality
Work product created for the Trust under this Agreement is assigned to the Trust upon payment. The Counterparty shall keep Trust information — including donor and beneficiary data — confidential and use it only to perform the Services.

## 6. Termination
Either party may terminate with thirty (30) days' written notice; the Trust shall pay for Services satisfactorily performed to the termination date. The Trust may terminate immediately for material breach or conduct inconsistent with its values and safeguarding standards.

## 7. General
This is the entire agreement; amendments must be written. It is governed by the laws of ${jurisdiction}.`;
      break;

    case 'scholarship':
      body = `## 1. Award
The Trust awards ${cp} (the "Recipient") a scholarship${input.amount ? ` of $${Number(input.amount).toLocaleString()}` : ''} in support of: ${input.scope || '[PROGRAM OF STUDY / PURPOSE]'}, for a period of ${term} from the Effective Date.

## 2. Use of Funds
Scholarship funds shall be used solely for the stated educational purpose — tuition, fees, learning materials, and directly related costs. Funds may be disbursed to the Recipient or directly to the educational institution, at the Trust's discretion.

## 3. Recipient Commitments
The Recipient agrees to: (a) remain enrolled and in good standing; (b) provide enrollment confirmation and progress reports each term; (c) notify the Trust promptly of any change in enrollment or circumstances; (d) embody, in conduct and community, the values of the Trust.

## 4. The Ennoblement Covenant
This scholarship is not charity; it is an investment in the Recipient's innate worth and potential. The Recipient is invited — not required — to lift others as they rise: mentoring peers, serving their community, and, where possible, becoming an ambassador of the ennobling spirit.

## 5. Suspension and Repayment
The Trust may suspend or withdraw the award if funds are misused or enrollment lapses without cause. Funds documented as properly used are never repayable; misused funds may be recoverable.

## 6. General
This Agreement is governed by the laws of ${jurisdiction} and represents the entire understanding between the parties.`;
      break;
  }

  const signature = `

---

**Signatures**

| ${ORG} | ${cp} |
| --- | --- |
| Name: Dr. Kasthuri Henry | Name: |
| Title: Founder & Executive Director | Title: |
| Date: | Date: |

${NOTICE}`;

  return { title, content: header + body + signature };
}
